import React from "react";
import classNames from "classnames";

export function One({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={classNames("text-body-lg", className)} {...rest}>
      {children}
    </p>
  );
}

export function Two({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={classNames("text-body-base", className)} {...rest}>
      {children}
    </p>
  );
}

export function Three({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={classNames("text-body-md", className)} {...rest}>
      {children}
    </p>
  );
}
