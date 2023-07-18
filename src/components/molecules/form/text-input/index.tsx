import classNames from 'classnames';
import React from 'react';
import { HelpText, Input, Label } from '../../../atoms';

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
        <Input error={error} {...others} />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
