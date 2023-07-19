import classNames from 'classnames';
import React, { LabelHTMLAttributes } from 'react';

interface props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}
export function Label(props: props) {
  const { required, children, ...others } = props;

  return (
    <label {...others}>
      {children}
      <span
        className={classNames('text-base-semantic-error-70', {
          'hidden': !required,
          'inline':required
        })}
      >
        *
      </span>
    </label>
  );
}
