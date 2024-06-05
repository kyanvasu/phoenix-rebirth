import { useMemo } from "react";
import { ButtonProps } from "../../types/button.props";

const variantStyle = {
  solid:
    "text-base-neutral-white bg-base-primary-100 hover:bg-base-primary-80 disabled:bg-base-neutral-grey-20",
  outline:
    "border text-base-neutral-grey-80 border-base-neutral-grey-40 bg-base-neutral-white hover:bg-base-neutral-grey-10 disabled:bg-base-neutral-white",
  link: "text-base-primary-100 hover:text-base-primary-80",
};

const sizeStyles = {
  medium: "px-[14px] h-10",
  small: "px-3 h-9",
  "x-small": "px-2 h-8",
};
export function useButton(props: ButtonProps) {
  const size = useMemo(() => {
    return sizeStyles[props.size!] || sizeStyles["medium"];
  }, [props.size]);
  const variant = useMemo(() => {
    return variantStyle[props.variant!] || variantStyle["solid"];
  }, [props.variant]);

  return {
    model: {
      size,
      variant,
    },
    operations: {},
  };
}
