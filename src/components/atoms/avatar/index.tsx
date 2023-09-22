import classNames from 'classnames';
import React from 'react';

export type AvatarSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

interface Props {
  size: AvatarSize;
  name?: string;
  className?: string;
  src?: string;
  alt?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  'xx-small': 'h-6 w-6 text-caption-sm',
  'x-small': 'h-8 w-8 text-body-md',
  small: 'h-10 w-10 text-heading-xs',
  medium: 'h-[60px] w-[60px] text-heading-base',
  large: 'h-[100px] w-[100px] text-heading-base',
};

export function Avatar(props: Props) {
  const { size, alt, className, name, src } = props;
  const defaultStyles = 'rounded-full border border-base-neutral-grey-30';

  return (
    <div
      className={classNames(
        defaultStyles,
        sizeStyles[size],
        {
          'inline-flex items-center justify-center leading-0 bg-base-primary-80 text-base-neutral-white font-normal':
            !src,
        },
        className
      )}
    >
      {src ? (
        <img
          className={classNames('rounded-full object-cover', sizeStyles[size])}
          src={src}
          alt={alt}
        />
      ) : (
        name?.charAt(0)
      )}
    </div>
  );
}
