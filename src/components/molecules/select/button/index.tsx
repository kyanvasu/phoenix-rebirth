import { Listbox } from "@headlessui/react";
import React from "react";
import classNames from "classnames";
import ChevronDown from "../../../atoms/icons/chevron-down";

interface Props {
  className?: string;
  Icon?: React.ReactNode;
  error?: boolean;
  placeholder?: string;
  disabled: boolean;
}
export function Button({
  className,
  Icon,
  error,
  placeholder,
  disabled,
}: Props) {
  return (
    <Listbox.Button
      className={classNames(
        "relative flex items-center h-9 w-full rounded-md bg-base-neutral-white disabled:bg-base-neutral-grey-30 p-2 pr-10 text-left text-base-neutral-grey-80 shadow-sm ring-1 ring-inset ring-base-neutral-grey-30 focus:outline-none focus:ring-1 focus:ring-base-primary-100 focus:text-base-neutral-grey-100 text-body-md leading-6",
        {
          "border border-base-semantic-error-100 focus:ring-transparent": error,
        },
        className
      )}
    >
      {Icon && Icon}

      <span
        className={classNames("block truncate ", {
          "ml-2": Icon,
        })}
      >
        {placeholder}
      </span>

      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown
          className={classNames(
            "w-5 h-5",
            disabled && "text-base-neutral-grey-60"
          )}
          fill="currentColor"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  );
}
