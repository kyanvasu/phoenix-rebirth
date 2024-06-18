import { IconProps } from "@/model/types";

export default function Bell(props: IconProps) {
  const { className, size = 20 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      stroke="#374151"
      fill="none"
      className={className}
    >
      <path
        d="M12.5 14.1667H16.6667L15.4959 12.9959C15.1784 12.6784 15 12.2477 15 11.7987V9.16667C15 6.98964 13.6087 5.13757 11.6667 4.45118V4.16667C11.6667 3.24619 10.9205 2.5 10 2.5C9.07954 2.5 8.33334 3.24619 8.33334 4.16667V4.45118C6.39136 5.13757 5.00001 6.98964 5.00001 9.16667V11.7987C5.00001 12.2477 4.82163 12.6784 4.50412 12.9959L3.33334 14.1667H7.50001M12.5 14.1667V15C12.5 16.3807 11.3807 17.5 10 17.5C8.6193 17.5 7.50001 16.3807 7.50001 15V14.1667M12.5 14.1667H7.50001"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
