import React, { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required = false, children, ...others }: Props) {
  return (
    <label {...others}>
      {children}
      {required && (
        <span className='text-base-semantic-error-70 ml-1 '>*</span>
      )}
    </label>
  );
}
