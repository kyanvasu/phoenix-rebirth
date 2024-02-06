import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function UploadImage(props: Props) {
  const {
    size = 60,
    stroke = '#A1A1A1',
    strokeWidth = '2',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    ...rest
  } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 40 40`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={stroke}
      {...rest}
    >
      <path
        d='M6.66666 26.6667L14.3096 19.0237C15.6114 17.7219 17.7219 17.7219 19.0237 19.0237L26.6667 26.6667M23.3333 23.3333L25.9763 20.6903C27.278 19.3886 29.3886 19.3886 30.6903 20.6903L33.3333 23.3333M23.3333 13.3333H23.35M9.99999 33.3333H30C31.8409 33.3333 33.3333 31.8409 33.3333 30V9.99999C33.3333 8.15904 31.8409 6.66666 30 6.66666H9.99999C8.15904 6.66666 6.66666 8.15904 6.66666 9.99999V30C6.66666 31.8409 8.15904 33.3333 9.99999 33.3333Z'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
