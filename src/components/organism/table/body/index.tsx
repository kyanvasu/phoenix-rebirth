import React from 'react';

export function TBody(props: React.HTMLAttributes<HTMLElement>) {
  const { children, ...others } = props;
  return <tbody {...others}>{children}</tbody>;
}
