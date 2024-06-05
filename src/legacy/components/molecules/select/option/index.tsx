import { Listbox } from "@headlessui/react";
import React from "react";
import Check from "../../../atoms/icons/check";
import classNames from "classnames";
import { SelectTypes } from "../../../../../model/types";

import { BaseTheme } from "../../../../../theme/base-theme";

export function Option({
  option,
  custom,
}: {
  option: any;
  custom?: SelectTypes;
}) {
  const theme = custom?.option ?? BaseTheme.Select?.option;
  return (
    <Listbox.Option className={classNames(theme?.container)} value={option}>
      {({ selected, active }) => (
        <>
          <span className={classNames("block truncate", theme?.active)}>
            {option}
          </span>
          {selected && (
            <span
              className={classNames(
                "absolute inset-y-0 right-0 flex items-center pr-4",
                theme?.["text-selected"],
                { "text-base-primary-100": active && !custom },
              )}
            >
              <Check fill="#1B75BB" />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  );
}
