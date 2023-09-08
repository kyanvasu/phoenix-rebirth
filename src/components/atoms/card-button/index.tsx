import classNames from 'classnames';
import React from 'react';

interface Props {
  icon: JSX.Element;
  className?: string;
}

export function CardButton(props: Props) {
  const { icon, className } = props;

  return (
    <div
      className={classNames(
        'flex items-center justify-center rounded-full w-11 h-11',
        className
      )}
    >
      {React.cloneElement(icon, {
        size: 24,
        className: 'stroke-base-neutral-grey-100',
      })}
    </div>
  );
}
