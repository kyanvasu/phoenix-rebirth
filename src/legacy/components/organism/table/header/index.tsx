import classNames from "classnames";
import React from "react";

export function THeader(props: React.HTMLAttributes<HTMLElement>) {
  const { className, children } = props;
  return (
    <thead
      className={classNames("font-bold  text-body-md", className, {
        "bg-base-neutral-grey-10 text-base-neutral-grey-80": !className,
      })}
    >
      {children}
    </thead>
  );
}
