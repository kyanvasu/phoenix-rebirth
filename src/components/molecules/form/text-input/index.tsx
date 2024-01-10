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
    <div className={theme?.container}>
      {label && (
        <Label className={theme?.label} required={required}>
          {label}
        </Label>
      )}
      <div className='relative shadow-sm'>
        <input className={theme?.input} {...others} />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
