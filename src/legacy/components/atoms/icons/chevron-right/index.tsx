import { IconProps } from "@/model/types";
import React from "react";

export default function ChevronRight(props: IconProps) {
  const { className, size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#111827"
      className={className}
    >
      <path
        d="M9 5L16 12L9 19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
