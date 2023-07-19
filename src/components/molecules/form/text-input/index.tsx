import classNames from 'classnames';
import React from 'react';
import { HelpText, Label } from '../../../atoms';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: boolean;
}

export function TextInput({
  className,
  label,
  required,
  helpText,
  error,
  ...others
}: Props) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-[6px] text-base-neutral-grey-80 font-normal text-caption-md',
        className
      )}
    >
      {label && <Label required={required}>{label}</Label>}
      <div className='relative shadow-sm'>
        <input
          className={classNames(
            'block w-full h-9 rounded-md border border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80 text-body-md disabled:bg-base-neutral-grey-30',
            {
              'border-red-500': error,
            }
          )}
          {...others}
        />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
