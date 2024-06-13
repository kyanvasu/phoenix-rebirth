import { BaseTheme } from "../../../../../theme/base-theme";
import { Listbox, Transition } from "@headlessui/react";
import { SelectTypes } from "../../../../../model/types";
import { Option } from "../option";
import { Fragment } from "react";

export function OptionsList({
  options,
  open,
  custom,
}: {
  options: any[];
  open: boolean;
  custom?: SelectTypes;
}) {
  const theme = custom?.listbox ?? BaseTheme.Select?.listbox;
  return (
    <Transition
      show={open}
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className={theme}>
        {options?.map((option, index) => (
          <Option key={index} option={option} custom={custom} />
        ))}
      </Listbox.Options>
    </Transition>
  );
}
