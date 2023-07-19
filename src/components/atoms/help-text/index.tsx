import classNames from 'classnames';
import React from 'react';
import { PropsWithChildren } from 'react';

interface props extends PropsWithChildren {
  error?: boolean;
}
export function HelpText({ children, error }: props) {
  return (
    <p className={classNames({ 'text-base-semantic-error-60': error })}>
      {children}
    </p>
  );
}
