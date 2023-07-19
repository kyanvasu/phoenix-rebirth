import React from 'react';

export function CheckboxSelected({
  fill,
  width,
  height,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width ?? 20}
      height={height ?? 20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1'
        y='1'
        width='18'
        height='18'
        rx='4'
        fill={fill ?? '#191567'}
        stroke='#191567'
      />
      <path
        d='M6.0625 10.5625L8.3125 12.8125L13.9375 7.1875'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
