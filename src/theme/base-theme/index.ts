import { ThemeTypes } from '../../model/types';

export const BaseTheme: ThemeTypes = {
  auth: {
    emptyState: {
      container: 'flex flex-col items-center text-center gap-y-8',
      title: 'font-semibold text-base-neutral-grey-100',
      subtitle: 'text-base-neutral-grey-80',
      button: 'text-base-neutral-grey-80',
    },
    group: {
      container: 'flex flex-col gap-2 form-group',
      rows: 'flex justify-between gap-4',
      columns: 'flex flex-col gap-4',
    },
    checkBox: {
      container:
        'flex justify-between items-center font-normal text-body-md text-base-neutral-grey-100 w-fit gap-2',
      label: 'font-semibold text-base-neutral-grey-100',
      input: 'border border-base-neutral-grey-40 rounded-md h-10 px-4',
      error: 'text-base-red-100 text-body-sm',
    },
    form: {
      container: 'flex flex-col gap-y-[38px]',
      span: 'flex flex-row gap-x-4',
      button:
        'rounded-md w-fit text-body-md font-semibold disabled:text-base-neutral-grey-60 flex flex-row items-center gap-2 justify-center w-full my-6',
      link: 'font-semibold text-base-primary-100 text-body-md',
      title: 'text-base-neutral-grey-80',
    },
    textInput: {
      container:
        'flex flex-col gap-[6px] font-normal text-caption-md text-base-neutral-grey-80',
      label: 'font-semibold text-base-neutral-grey-100',
      input:
        'block w-full h-9 rounded-md border text-body-md disabled:bg-base-neutral-grey-30 border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80',
      error: 'border-red-500 text-base-red-100 text-body-sm',
    },
    container: 'flex flex-col gap-y-[38px]',
    title: 'mt-6 mb-10 font-bold text-base-neutral-grey-100',
    subtitle: 'font-bold text-base-neutral-grey-100',
  },
  dropdown: {
    container: 'relative select-none w-min',
    button: 'outline-none',
    panel:
      'absolute rounded-sm border shadow-elevation-3 bg-base-neutral-white border-base-primary-30 text-base-neutral-grey-60 stroke-base-neutral-grey-60 hover:text-base-primary-60 hover:stroke-base-primary-60',
    list: 'list-none p-0 m-0',
    item: {
      container:
        'flex gap-2 py-1.5 px-[18px] min-w-[167px] cursor-pointer items-center',
      text: 'text-body-md text-inherit',
      icon: '',
      hover: 'hover:text-base-primary-60 hover:stroke-base-primary-60',
    },
  },
  emptyState: {
    container: 'flex flex-col items-center text-center gap-y-8',
    title: 'font-semibold text-base-neutral-grey-100',
    subtitle: 'text-base-neutral-grey-80',
    button: 'text-base-neutral-grey-80',
  },
  textInput: {
    container:
      'flex flex-col gap-[6px] font-normal text-caption-md text-base-neutral-grey-80',
    label: 'font-semibold text-base-neutral-grey-100',
    input:
      'block w-full h-9 rounded-md border text-body-md disabled:bg-base-neutral-grey-30 border-base-neutral-grey-30 p-2 text-base-neutral-grey-100 placeholder:text-base-neutral-grey-70 focus:outline-none focus:border-base-primary-80',
    error: 'border-red-500 text-base-red-100 text-body-sm',
  },
  checkBox: {
    container:
      'flex justify-between items-center font-normal text-body-md text-base-neutral-grey-100 w-fit gap-2',
    label: 'font-semibold text-base-neutral-grey-100',
    input: 'border border-base-neutral-grey-40 rounded-md h-10 px-4',
    error: 'text-base-red-100 text-body-sm',
  },
  sidebar: {
    container: 'w-full min-h-full shrink-0 flex flex-col bg-base-primary-100',
    logoContainer: 'shrink-0 py-3 px-2',
    nav: 'flex-1 shrink-0 px-2 py-3',
    ul: 'flex flex-col flex-1 gap-2',
    navItem: '',
    companyContainer:
      'bg-base-primary-90 border-t border-t-base-primary-70 shrink-0 p-5 cursor-pointer',
    changeCompany: 'flex items-center justify-between text-white p-0.5',
    changeCompanyText: 'font-semibold',
    changeCompanyIcon: 'stroke-white',
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
    button:
      "bg-base-primary-100 disabled:bg-base-neutral-grey-20 hover:bg-base-primary-80 text-base-neutral-white disabled:text-base-neutral-grey-80 w-fit text-body-md font-normal flex items-center gap-1.5 px-2 py-[2px] text-body-md font-normal text-base-neutral-white",
    square: "rounded-sm",
    round: "rounded-xl",
  },
  card: {
    container: "grid p-5 border rounded-md shadow-elevation-1",
    default: "border-base-neutral-grey-30",
  },
  cardButton: {
    container: "flex items-center justify-center rounded-full w-11 h-11",
    icon: "stroke-base-neutral-grey-100",
  },

  helpText: {
    error: "text-base-semantic-error-60",
  },
  label: {
    required: "text-base-semantic-error-70 ml-1",
  },
};
