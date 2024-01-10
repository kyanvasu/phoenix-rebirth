import React from 'react';
import classNames from 'classnames';
import { BadgeTypes } from '../../../model/types';
import { BaseTheme } from '../../../theme';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'square' | 'round';
  icon?: React.ReactNode;
  reverse?: boolean;
  theme?: BadgeTypes;

}

export function Badge(props: Props): JSX.Element {
  const {
    variant = 'round',
    type,
    disabled = false,
    reverse = false,
    icon,
    children,
    theme,
    ...rest
  } = props;


  const styles = theme || BaseTheme.badge;

  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        styles[variant],
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
}
