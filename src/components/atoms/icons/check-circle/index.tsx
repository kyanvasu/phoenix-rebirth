import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function CheckCircle(props: Props) {
  const { size = 16,  stroke = "#111827", ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={stroke}
      {...rest}
    >
      <path
        d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
