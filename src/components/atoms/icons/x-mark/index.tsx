import React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export default function XMark(props: Props) {
  const {
    size = 24,
    stroke = "#111827",
    strokeWidth = "2",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    color,
    ...rest
  } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
      className={color ?? stroke}
    >
      <path
        d='M6 18L18 6M6 6L18 18'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  )
}
