import { Listbox } from '@headlessui/react';
import React from 'react';
import Check from '../../../atoms/icons/check';
import classNames from 'classnames';

export function Option({ option }: { option: any }) {
  return (
    <Listbox.Option
      className={classNames(
        'text-base-neutral-grey-60 hover:bg-base-neutral-grey-10 hover:text-base-neutral-black relative text-body-md py-[6px] px-[10px]'
      )}
      value={option}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              'block truncate',
              selected && 'text-base-primary-100'
            )}
          >
            {option}
          </span>
          {selected && (
            <span
              className={classNames(
                'absolute inset-y-0 right-0 flex items-center pr-4',
                { 'text-base-primary-100': active }
              )}
            >
              <Check fill='#1B75BB' />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  );
}
