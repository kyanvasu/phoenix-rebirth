import classNames from "classnames";
import React from "react";

export function Card(props: React.HTMLProps<HTMLInputElement>) {
  const { children, className } = props;
  return (
    <article
      className={classNames(
        'grid p-5 border rounded-md shadow-elevation-1',
        className,
        {
          'border-base-neutral-grey-30': !className,
        }
      )}
    >
      {children}
    </article>
  );
}
