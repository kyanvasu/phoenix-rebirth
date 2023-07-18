import classNames from 'classnames';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...others }: Props) {
  return (
    <input
      className={classNames(
        'block w-full h-9 rounded-md border border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80 text-body-md disabled:bg-base-neutral-grey-30',
        {
          'border-red-500': error,
        },
        className
      )}
      {...others}
    />
  );
}
