import { IconProps } from "@/model/types";
import React from "react";

export default function Briefcase(props: IconProps) {
  const { className, size = 20 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="white"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.5 11.0463C15.1839 11.9838 12.6523 12.5001 10 12.5001C7.34775 12.5001 4.81608 11.9838 2.5 11.0463M13.3333 5.00008V3.33341C13.3333 2.41294 12.5871 1.66675 11.6667 1.66675H8.33333C7.41286 1.66675 6.66667 2.41294 6.66667 3.33341V5.00008M10 10.0001H10.0083M4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9206 17.5 15.0001V6.66675C17.5 5.74627 16.7538 5.00008 15.8333 5.00008H4.16667C3.24619 5.00008 2.5 5.74627 2.5 6.66675V15.0001C2.5 15.9206 3.24619 16.6667 4.16667 16.6667Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
