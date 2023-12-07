import React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export default function XCicle(props: Props) {
  const {
    size = 24,
    stroke = "#111827",
    strokeWidth = "2",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    ...rest
  } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={stroke}
      {...rest}
    >
      <path
        d="M8 12.6667L10 10.6667M10 10.6667L12 8.66669M10 10.6667L8 8.66669M10 10.6667L12 12.6667M19 10.6667C19 15.6372 14.9706 19.6667 10 19.6667C5.02944 19.6667 1 15.6372 1 10.6667C1 5.69612 5.02944 1.66669 10 1.66669C14.9706 1.66669 19 5.69612 19 10.6667Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
