import React from 'react';
import classNames from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'square' | 'round';
  icon?: React.ReactNode;
  reverse?: boolean;
}

const style = {
  square: 'rounded-sm',
  round: 'rounded-xl',
};

export function Badge(props: Props): JSX.Element {
  const {
    variant = 'round',
    type,
    className,
    disabled = false,
    reverse = false,
    icon,
    children,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={classNames(
        'bg-base-primary-100 disabled:bg-base-neutral-grey-20 hover:bg-base-primary-80 text-base-neutral-white disabled:text-base-neutral-grey-80 w-fit text-body-md font-normal flex items-center gap-1.5 px-2 py-[2px]',
        'text-body-md font-normal text-base-neutral-white',
        style[variant],
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
}
