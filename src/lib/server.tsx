import React, {
  Fragment,
  JSX,
  useMemo,
  PropsWithChildren,
  ReactNode,
} from "react";

const isSSR = globalThis?.window === undefined || globalThis?.window === null;

function transformChildrenToSlots<T extends string>(
  children: ReactNode,
  expectedSlots: readonly T[]
): Record<T, ReactNode> {
  const childrenArray = React.Children.toArray(children);
  const slots = childrenArray.reduce((acc, child) => {
    if (React.isValidElement(child) && "name" in child.props) {
      return {
        ...acc,
        [child.props.name]: child.props.children,
      };
    }
    return acc;
  }, {} as Record<T, ReactNode>);

  expectedSlots.forEach((slotName) => {
    if (!(slotName in slots)) {
      console.warn(`Missing required slot: ${slotName}`);
    }
  });

  return slots;
}

export interface WithSlotsProps<T extends string> {
  slots: Record<T, ReactNode>;
}

export interface SlotProps<T extends string> extends PropsWithChildren {
  name: T;
}

export function For<T extends readonly any[], U extends JSX.Element>(props: {
  error?: JSX.Element;
  fallback?: JSX.Element;
  each: T | undefined | null | false;
  children: (item: T[number], props: { index: number; key: string }) => U;
}) {
  const ErrorFragment = (prop: { index: number }) => (
    <Fragment key={`error-${prop.index}`}>{props?.error ?? null}</Fragment>
  );

  if (Array.isArray(props.each)) {
    if (!isSSR) {
      const items = useMemo(() => props.each as T, [props.each]);

      return !!items.length
        ? items.map((item, index) => {
            try {
              return props.children(item, {
                index,
                key: `${index}`,
              });
            } catch (e) {
              return <ErrorFragment index={index} />;
            }
          })
        : props.fallback;
    }

    // fallback for SSR
    return !!props.each.length
      ? props.each.map((item, index) => {
          try {
            return props.children(item, {
              index,
              key: `${index}`,
            });
          } catch (e) {
            return <ErrorFragment index={index} />;
          }
        })
      : props.fallback;
  }

  return null;
}

export function Show<T>(props: {
  when: T | undefined | null | false;
  deps: any[];
  fallback?: JSX.Element;
  children:
    | JSX.Element
    | ((item: NonNullable<T> | NonNullable<T>) => JSX.Element);
}): JSX.Element {
  const condition = useMemo(
    () => props.when,
    Array.isArray(props.deps) ? [...props.deps] : []
  );

  if (condition) {
    const child = props.children;
    const fn = typeof child === "function" && child.length > 0;

    return <Fragment>{fn ? (child as any)(condition) : child}</Fragment>;
  }

  return <Fragment>{props.fallback ?? null}</Fragment>;
}

export function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element[] | JSX.Element;
}) {
  let matched: JSX.Element = <Fragment></Fragment>;

  const isArray = Array.isArray(props.children);

  if (isArray) {
    const children = props.children as JSX.Element[];

    const index = children.findIndex(({ props }: any) => {
      return props.when;
    });

    if (index === -1) return <Fragment>{props.fallback ?? null}</Fragment>;

    matched = children[index];

    return <Fragment>{matched}</Fragment>;
  } else {
    const children = props.children as JSX.Element;
    const condition = children.props.when;

    return condition ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Fragment>{props.fallback ?? null}</Fragment>
    );
  }
}

export function Match(props: {
  when: boolean;
  children: JSX.Element[] | JSX.Element;
}) {
  return props.when ? props.children : null;
}

export function WithSlots<T extends string, P extends WithSlotsProps<T>>(
  WrappedComponent: React.ComponentType<P>,
  expectedSlots: readonly T[]
) {
  return function WithSlotsWrapper(
    props: Omit<P, keyof WithSlotsProps<T>> & { children: ReactNode }
  ) {
    const { children, ...rest } = props;

    const slots = transformChildrenToSlots(children, expectedSlots);

    return <WrappedComponent {...(rest as unknown as P)} slots={slots} />;
  };
}

export function Slot<T extends string>({ children }: SlotProps<T>) {
  return <>{children}</>;
}
