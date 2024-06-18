import classNames from "classnames";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  dark?: boolean;
}
export default function Spinner(props: Props) {
  const { size = 20, dark = false, className, ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      className={classNames(
        "animate-spin",
        {
          "fill-base-primary-100 text-white": dark,
          "fill-white text-base-primary-30": !dark,
        },
        className,
      )}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.33333C6.3181 3.33333 3.33333 6.3181 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.3181 13.6819 3.33333 10 3.33333ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
        fill="currentColor"
      />
      <path
        d="M3.33333 10C3.33333 8.23189 4.03571 6.5362 5.28595 5.28595C6.5362 4.03571 8.23189 3.33333 10 3.33333V0C4.4775 0 0 4.4775 0 10H3.33333ZM5 14.4092C3.92351 13.193 3.3305 11.6242 3.33333 10H0C0 12.535 0.945833 14.8533 2.5 16.615L5 14.4092Z"
        fill="currentFill"
      />
    </svg>
  );
}
