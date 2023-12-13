import React from 'react';
import { Size } from '../../../model/types';
import classNames from 'classnames';
import { Avatar } from '../../atoms';

interface Props extends React.HTMLProps<HTMLDivElement> {
  Size?: Size;
  src?: string;
  name?: string;
  company?: string;
  textColor?: string;
}
export default function Profile(props: Props) {
  const { src, className, name, company, Size = 'xx-small', ...rest } = props;

  return (
    <div
      className={classNames('flex flex-row font-normal gap-2', className)}
      {...rest}
    >
      <Avatar src={src} size={Size} name={name} />

      <div
        className={classNames(
          'flex flex-col justify-center',
          rest.textColor,
          {
            'text-body-base': Size === ('medium' || 'small'),
            'text-body-md': Size === 'xx-small',
            'text-base-neutral-grey-100': !rest.textColor
          }
        )}
      >
        <span>{name}</span>

        {company && (
          <span className='text-caption-sm text-base-neutral-grey-60'>
            {company}
          </span>
        )}
      </div>
    </div>
  );
}
