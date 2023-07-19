import React from "react";

export function CheckboxDefault({ stroke, width, height }: React.SVGProps<SVGSVGElement>) {
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
        fill='white'
        stroke={stroke ?? '#9CA3AF'}
      />
    </svg>
  );
}
