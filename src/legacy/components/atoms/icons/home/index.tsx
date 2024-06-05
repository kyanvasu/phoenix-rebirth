import React from "react";
import { IconProps } from "../../../../model/types/icon.props";

export default function Home(props: IconProps) {
  const { size = 20, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="#191567"
      className={className}
    >
      <path
        d="M2.5 10L4.16667 8.33333M4.16667 8.33333L10 2.5L15.8333 8.33333M4.16667 8.33333V16.6667C4.16667 17.1269 4.53976 17.5 5 17.5H7.5M15.8333 8.33333L17.5 10M15.8333 8.33333V16.6667C15.8333 17.1269 15.4602 17.5 15 17.5H12.5M7.5 17.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V13.3333C8.33333 12.8731 8.70643 12.5 9.16667 12.5H10.8333C11.2936 12.5 11.6667 12.8731 11.6667 13.3333V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5M7.5 17.5H12.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
