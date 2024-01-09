import { ThemeTypes } from "../../model/types";

export const BaseTheme: ThemeTypes = {
  emptyState: {
    container: "flex flex-col items-center text-center gap-y-8",
    title: "font-semibold text-base-neutral-grey-100",
    subtitle: "text-base-neutral-grey-80",
  },
  dropdown: {
    container: "relative select-none w-min",
    button: "outline-none",
    panel:
      "absolute rounded-sm border shadow-elevation-3 bg-base-neutral-white border-base-primary-30 text-base-neutral-grey-60 stroke-base-neutral-grey-60 hover:text-base-primary-60 hover:stroke-base-primary-60",
    list: "list-none p-0 m-0",
    item: {
      container:"flex gap-2 py-1.5 px-[18px] min-w-[167px] cursor-pointer items-center",
      text: "text-body-md text-inherit",
      icon: "",
      hover: "hover:text-base-primary-60 hover:stroke-base-primary-60",
    },
  },
};
