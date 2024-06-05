import { IconProps } from "@/model/types";
import React from "react";

export default function ArrowLeft(props: IconProps) {
  const { size = 24, className } = props;

  return (
    <svg
      width={size}
      height={size}
      stroke="#111827"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M10 19L3 12M3 12L10 5M3 12L21 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
