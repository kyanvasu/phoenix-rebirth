import classNames from 'classnames';
import React from 'react';
import { HelpText, Label } from '../../../atoms';
import { InputStyles } from '../../../../model/types';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: InputStyles;
  helpText?: string;
  error?: boolean;
}

export function TextInput({
  className,
  label,
  theme,
  required,
  helpText,
  error,
  ...others
}: Props) {
  return (
    <div
      className={classNames(
        theme?.container,
        {
          'text-base-neutral-grey-80': !className,
        },
        className
      )}
    >
      {label && (
        <Label className={theme?.label} required={required}>
          {label}
        </Label>
      )}
      <div className='relative shadow-sm'>
        <input
          className={classNames(theme?.input, className, {
            'border-red-500': error,
            'border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80':
              !className,
          })}
          {...others}
        />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
