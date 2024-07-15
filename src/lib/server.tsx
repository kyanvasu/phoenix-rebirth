import { Fragment, JSX, useMemo } from "react";

const isSSR = globalThis?.window === undefined || globalThis?.window === null;

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
    Array.isArray(props.deps) ? [...props.deps] : [],
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

    return condition
      ? <Fragment>{children}</Fragment>
      : <Fragment>{props.fallback ?? null}</Fragment>;
  }
}

export function Match(props: {
  when: boolean;
  children: JSX.Element[] | JSX.Element;
}) {
  return props.when ? props.children : null;
}
