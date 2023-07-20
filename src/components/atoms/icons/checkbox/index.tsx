import React from 'react';
import { IconProps } from '../../../../model/types';

interface Props extends IconProps {
  active?: boolean;
}

export default function Checkbox(props: Props) {
  const { active } = props;

  if (active) {
    return <Active {...props} />;
  }

  return <Default {...props} />;
}

function Default({ size = 20, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      stroke={'#9CA3AF'}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1'
        y='1'
        width='18'
        height='18'
        rx='4'
        fill='white'
      />
    </svg>
  );
}

function Active({ size = 20, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='#191567'
      stroke='#191567'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1'
        y='1'
        width='18'
        height='18'
        rx='4'
      />
      <path
        d='M6.0625 10.5625L8.3125 12.8125L13.9375 7.1875'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}