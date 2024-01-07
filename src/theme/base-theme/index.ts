import { ThemeTypes } from '../../model/types';

export const BaseTheme: ThemeTypes = {
  emptyState: {
    container: 'flex flex-col items-center text-center gap-y-8',
    title: 'font-semibold text-base-neutral-grey-100',
    subtitle: 'text-base-neutral-grey-80',
  },
  login: {
    formTheme: {
      container: '',
      span: 'flex flex-row gap-x-4',
      button: 'justify-center w-full my-6 ',
      link: 'font-semibold text-base-primary-100 text-body-md',
      title: 'text-base-neutral-grey-80',
    },
    checkBoxTheme: {
      container: 'flex justify-between items-center',
      label: 'font-semibold text-base-neutral-grey-100',
      input: 'border border-base-neutral-grey-40 rounded-md h-10 px-4',
      error: 'text-base-red-100 text-body-sm',
    },
    textInputTheme: {
      container: ' flex flex-col gap-[6px] font-normal text-caption-md',
      label: 'font-semibold text-base-neutral-grey-100',
      input:
        'block w-full h-9 rounded-md border text-body-md disabled:bg-base-neutral-grey-30',
      error: 'border-red-500 text-base-red-100 text-body-sm',
    },
    container: 'flex flex-col gap-y-[38px]',
    title: 'mt-6 mb-10 font-bold text-base-neutral-grey-100',
  },
  register: {
    groupTheme: {
      container: 'flex flex-col gap-2 form-group',
      rows: 'flex justify-between gap-4',
      columns: 'flex flex-col gap-4',
    },
    formTheme: {
      container: 'flex flex-col gap-y-[38px]',
      span: 'flex flex-row gap-x-4',
      button: 'justify-center w-full my-6',
      link: 'font-semibold text-base-primary-100 text-body-md',
      title: 'text-base-neutral-grey-80',
    },
    textInputTheme: {
      container: ' flex flex-col gap-[6px] font-normal text-caption-md',
      label: 'font-semibold text-base-neutral-grey-100',
      input:
        'block w-full h-9 rounded-md border text-body-md disabled:bg-base-neutral-grey-30',
      error: 'border-red-500 text-base-red-100 text-body-sm',
    },
    container: '',
    title: 'mt-6 mb-10 font-bold text-base-neutral-grey-100',
  },
};
