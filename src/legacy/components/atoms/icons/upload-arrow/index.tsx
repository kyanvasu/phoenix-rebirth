import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function UploadArrow(props: Props) {
  const {
    size = 60,
    fill = "#A1A1A1",
    className,
  } = props;
  return (
    <div className={className}>
      <svg
        fill={fill}
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
      </svg>
    </div>
  );
}
