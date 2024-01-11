'use client';
import React from 'react';
import { HelpText, Label } from '../../../atoms';
import { InputTypes } from '../../../../model/types';
import { useClientContext } from '../../../../client';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: InputTypes;
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
  const context = useClientContext();
  const styles = theme || context.theme.checkBox;

  return (
    <div className={styles?.container}>
      {label && (
        <Label className={styles?.label} required={required}>
          {label}
        </Label>
      )}
      <div className='relative shadow-sm'>
        <input className={styles?.input} {...others} />
      </div>

      {helpText && <HelpText error={error}>{helpText}</HelpText>}
    </div>
  );
}
