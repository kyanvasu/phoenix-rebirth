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
      className={classNames(theme?.container, {
        'flex flex-col gap-[6px] font-normal text-caption-md text-base-neutral-grey-80':
          !className && !theme?.container,
        [`${className}`]: !theme?.container && !!className,
      })}
    >
      {label && (
        <Label className={classNames(theme?.label)} required={required}>
          {label}
        </Label>
      )}
      <div className='relative shadow-sm'>
        <input
          className={classNames(theme?.input, {
            [`${theme?.error}`]: error,
            'block w-full h-9 rounded-md border text-body-md disabled:bg-base-neutral-grey-30 border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80':
              !className && !theme?.input,
            [`${className}`]: !theme?.input && !!className,
          })}
          {...others}
        />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
