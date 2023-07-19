import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../../../../model/types/button.props';
import { useButton } from '../../../../model/interactions/use-button';

export function Button({
  type,
  disabled,
  className,
  children,
  size,
  variant,
  ...rest
}: ButtonProps): JSX.Element {
  const { model } = useButton({ size, variant });
  return (
    <button
      type={type}
      className={classNames(
        'rounded-md w-fit text-body-md font-semibold disabled:text-base-neutral-grey-60 flex flex-row items-center gap-2',
        model.size,
        model.variant,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
