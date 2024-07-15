"use client";

import { Fragment, JSX, startTransition, useEffect, useState } from "react";

async function fn() {
  return <hr />;
}

type AsyncComponent = ReturnType<typeof fn>;

export function Await<T extends unknown = AsyncComponent>(props: {
  catch?: JSX.Element;
  fallback?: JSX.Element;
  children: T;
}) {
  const [resolved, setResolved] = useState(null as unknown as JSX.Element);
  const [hasError, setHasError] = useState(false);
  const [isWait, setIsWait] = useState(true);

  const ErrorFragment = () => <Fragment>{props.catch ?? null}</Fragment>;

  try {
    const {
      props: _props,
      type: Fn,
      key,
    } = { ...(props?.children ?? {}) } as any;

    useEffect(() => {
      Fn(null, _props)
        .then((value: JSX.Element) =>
          startTransition(() => {
            console.log(value);
            setResolved(value);
          })
        )
        .catch((e: any) => setHasError(!!e))
        .finally(() => startTransition(() => setIsWait(false)));
    }, []);

    const Children = () => <Fragment key={key}>{resolved}</Fragment>;

    const Fallback = () => (
      <Fragment key={key}>{props.fallback ?? null}</Fragment>
    );

    return isWait ? <Fallback /> : hasError ? <ErrorFragment /> : <Children />;
  } catch (error) {
    console.log(error);
    return <ErrorFragment />;
  }
}

export function $(
  fetcher: () => Promise<any>,
  fn: (fn: () => void | Promise<void>) => void | Promise<void> | any,
) {
  return () => fetcher().then(({ default: importeer }) => fn(importeer));
}
