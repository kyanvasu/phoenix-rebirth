'use client';

import { Atoms } from '@kanvas/phoenix';
import { HTMLProps, useState, useRef, useEffect } from 'react';

// This component was made specific for the header checkbox to select all the checkbox.
export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const [checked, setChecked] = useState<boolean>(rest.checked || false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.indeterminate = indeterminate && !rest.checked;
    }
  }, [indeterminate, checked]);

  const handleCheckboxClick = () => {
    const newChecked: boolean = !rest.checked;
    setChecked(newChecked);
    if (typeof rest.onChange === 'function') {
      // @ts-ignore
      rest.onChange({ target: { checked: newChecked } });
    }
  };

  return (
    <div
      className={className + ' cursor-pointer'}
      onClick={handleCheckboxClick}
    >
      <Atoms.Icons.Checkbox active={rest.checked} />
      <input
        type='checkbox'
        ref={ref}
        className='hidden'
        checked={rest.checked}
        {...rest}
      />
    </div>
  );
}
