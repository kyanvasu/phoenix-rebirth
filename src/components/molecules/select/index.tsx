import { Listbox } from '@headlessui/react';
import React from 'react';
import { OptionsList } from './options-list';
import { Button } from './button';
import classNames from 'classnames';
import { FormikErrors } from 'formik';

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  helpText?: string;
  label?: string;
  options: any[];
  Icon?: React.ReactNode;
  error?: boolean;
  value?: string;
  setFieldValue?: (
    field: string,
    val: any
  ) => Promise<void> | Promise<FormikErrors<any>>;
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
  } = props;
  const [selected, setSelected] = React.useState<string | undefined>(value);
  const handleChange = (val: string) => {
    setSelected(val);
    setFieldValue?.(name, val);
  };
  return (
    <Listbox disabled={disabled} value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className={className}>
          {label && (
            <Listbox.Label className='block font-medium text-caption-md text-base-neutral-grey-80 pb-[6px]'>
              {label}
            </Listbox.Label>
          )}
          <div className='relative'>
            <Button
              placeholder={selected ? selected : props.placeholder}
              Icon={Icon}
              error={error}
              disabled={disabled}
            />
            <OptionsList open={open} options={options} />
          </div>
          {helpText && (
            <Listbox.Label
              className={classNames(
                'relative mt-[6px] text-caption-md font-normal text-base-neutral-grey-80',
                {
                  ' text-base-semantic-error-100': error,
                }
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
