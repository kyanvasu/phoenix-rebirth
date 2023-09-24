import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Padlock(props: Props) {
  const { size = 24, stroke = '#111827', ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      stroke={stroke}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
