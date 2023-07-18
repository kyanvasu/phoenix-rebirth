import React from 'react';

import classNames from 'classnames';

export function One({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={classNames('text-heading-xl', className)} {...others}>
      {children}
    </h1>
  );
}

export function Two({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={classNames('text-heading-lg', className)} {...others}>
      {children}
    </h2>
  );
}

export function Three({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={classNames('text-heading-base', className)} {...others}>
      {children}
    </h3>
  );
}

export function Four({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={classNames('text-heading-md', className)} {...others}>
      {children}
    </h4>
  );
}

export function Five({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={classNames('text-heading-sm', className)} {...others}>
      {children}
    </h5>
  );
}

export function Six({
  className,
  children,
  ...others
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6 className={classNames('text-heading-xs', className)} {...others}>
      {children}
    </h6>
  );
}
