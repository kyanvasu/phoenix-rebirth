import { Transition, Listbox } from '@headlessui/react';
import { Option } from '../option';
import React from 'react';

export function OptionsList({
  options,
  open,
}: {
  options: any[];
  open: boolean;
}) {
  return (
    <Transition
      show={open}
      as={React.Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Listbox.Options className='absolute z-10 w-full py-1 mt-3 overflow-auto bg-white rounded-md shadow-elevation-3 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-body-md'>
        {options?.map((option, index) => (
          <Option key={index} option={option} />
        ))}
      </Listbox.Options>
    </Transition>
  );
}
