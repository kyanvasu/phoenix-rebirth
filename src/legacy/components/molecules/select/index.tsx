import { Listbox } from "@headlessui/react";
import React from "react";
import { OptionsList } from "./options-list";
import { Button } from "./button";
import classNames from "classnames";
import { FormikErrors } from "formik";
import { SelectTypes } from "../../../../model/types";
import { useClientContext } from "../../../../model/store/core.store/client.store";
import { BaseTheme } from "../../../../theme/base-theme";

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  helpText?: string;
  label?: string;
  options: any[];
  Icon?: React.ReactNode;
  error?: boolean;
  value?: string;
  textColor?: string;
  setFieldValue?: (
    field: string,
    val: any,
  ) => Promise<void> | Promise<FormikErrors<any>>;
  customTheme?: SelectTypes;
  placeholder?: string;
}

export default function Select(props: Props) {
  const {
    disabled = false,
    className,
    value,
    setFieldValue,
    Icon,
    name,
    error,
    helpText,
    options,
    label,
    textColor,
    customTheme,
  } = props;
  const [selected, setSelected] = React.useState<string | undefined>(value);
  const handleChange = (val: string) => {
    setSelected(val);
    setFieldValue?.(name, val);
  };
  const phoenixTheme = useClientContext();
  const theme = customTheme ??
    phoenixTheme.theme.Select ??
    BaseTheme.Select;
  return (
    <Listbox disabled={disabled} value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className={className}>
          {label && (
            <Listbox.Label
              className={classNames(
                "block font-medium text-caption-md pb-[6px]",
                className,
                {
                  "text-base-neutral-grey-80": !textColor,
                },
              )}
            >
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <Button
              placeholder={selected ? selected : (props?.placeholder ?? "")}
              Icon={Icon}
              error={error}
              disabled={disabled}
              custom={theme}
            />
            <OptionsList open={open} options={options} custom={theme} />
          </div>
          {helpText && (
            <Listbox.Label
              className={classNames(
                "relative mt-[6px] text-caption-md font-normal",
                {
                  " text-base-semantic-error-100": error,
                  "text-base-neutral-grey-60": !textColor,
                },
              )}
            >
              {helpText}
            </Listbox.Label>
          )}
        </div>
      )}
    </Listbox>
  );
}
