import { Listbox } from "@headlessui/react";
import React from "react";
import classNames from "classnames";
import ChevronDown from "../../../atoms/icons/chevron-down";
import { SelectTypes } from "../../../../../model/types";
import { BaseTheme } from "../../../../../theme";

interface Props {
  className?: string;
  Icon?: React.ReactNode;
  error?: boolean;
  placeholder?: string;
  disabled: boolean;
  custom?: SelectTypes;
}
export function Button({
  className,
  Icon,
  error,
  placeholder,
  disabled,
  custom,
}: Props) {
  const theme = custom?.button ?? BaseTheme.Select?.button;
  return (
    <Listbox.Button
      className={classNames(
        theme?.container,
        {
          "border border-base-semantic-error-100 focus:ring-transparent": error,
        },
        className,
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
          className={classNames("w-5 h-5", theme?.icon, {
            "text-base-neutral-grey-60": disabled,
          })}
          fill="currentColor"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  );
}
