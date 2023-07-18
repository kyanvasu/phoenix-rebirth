import classNames from 'classnames';
import React from 'react';
import { Label } from '../../../atoms';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({
  label,
  className,
  id,
  required,
  ...rest
}: Props): JSX.Element {
  return (
    <div
      className={classNames(
        'font-normal text-body-md text-base-neutral-grey-100 flex items-center w-fit gap-2',
        className
      )}
    >
      <input
        id={id}
        name={id}
        type='checkbox'
        className='h-[18px] w-[18px] rounded-[4px] border-base-neutral-grey-50 focus:ring-transparent text-base-primary-100'
        {...rest}
      />

      {label && (
        <Label htmlFor={id} className='select-none' required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}
