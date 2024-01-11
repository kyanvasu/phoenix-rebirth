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
      className={classNames(className, model.size, model.variant)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
