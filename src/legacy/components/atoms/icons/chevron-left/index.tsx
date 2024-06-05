import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function ChevronLeft(props: Props) {
  const { size = 24, ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#111827"
      {...rest}
    >
      <path
        d="M15 19L8 12L15 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
