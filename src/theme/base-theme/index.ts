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
      container:
        "flex gap-2 py-1.5 px-[18px] min-w-[167px] cursor-pointer items-center",
      text: "text-body-md text-inherit",
      icon: "",
      hover: "hover:text-base-primary-60 hover:stroke-base-primary-60",
    },
  },
  sidebar: {
    container: "w-full min-h-full shrink-0 flex flex-col bg-base-primary-100",
    logoContainer: "shrink-0 py-3 px-2",
    nav: "flex-1 shrink-0 px-2 py-3",
    ul: "flex flex-col flex-1 gap-2",
    navItem: "",
    companyContainer:
      "bg-base-primary-90 border-t border-t-base-primary-70 shrink-0 p-5 cursor-pointer",
    changeCompany: "flex items-center justify-between text-white p-0.5",
    changeCompanyText: "font-semibold",
    changeCompanyIcon: "stroke-white",
  },
  avatar: {
    container: "rounded-full border border-base-neutral-grey-30",
    img: "rounded-full object-cover",
    "xx-small": "h-6 w-6 text-caption-sm",
    "x-small": "h-8 w-8 text-body-md",
    small: "h-10 w-10 text-heading-xs",
    medium: "h-[60px] w-[60px] text-heading-base",
    large: "h-[100px] w-[100px] text-heading-base",
    default:
      "inline-flex items-center justify-center leading-0 bg-base-primary-80 text-base-neutral-white font-normal",
  },
  badge: {
    button: 'bg-base-primary-100 disabled:bg-base-neutral-grey-20 hover:bg-base-primary-80 text-base-neutral-white disabled:text-base-neutral-grey-80 w-fit text-body-md font-normal flex items-center gap-1.5 px-2 py-[2px] text-body-md font-normal text-base-neutral-white',
    square: 'rounded-sm',
    round: 'rounded-xl',
  },
  card: {
    container: 'grid p-5 border rounded-md shadow-elevation-1',
    default: 'border-base-neutral-grey-30',
  },
  cardButton: {
    container: 'flex items-center justify-center rounded-full w-11 h-11',
    icon: 'stroke-base-neutral-grey-100',
  },
};
