import classNames from 'classnames';
import React from 'react';
import { Label } from '../../../atoms';
import { CheckboxDefault, CheckboxSelected } from '../../../atoms/icons';
enum CheckboxState {
  default,
  active,
}

export interface Props {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (isChecked: boolean) => void;
  className?: string;
  id?: any;
}

function Checkbox({
  checked,
  onClick,
}: {
  checked: CheckboxState;
  onClick?: any;
}) {
  return (
    <div
      className={classNames(
        'font-normal text-body-md text-base-neutral-grey-100 flex items-center w-fit gap-2'
      )}
      onClick={onClick}
      role='checkbox'
      aria-checked={checked === CheckboxState.active}
      tabIndex={0}
    >
      {checked === CheckboxState.active ? (
        <CheckboxSelected />
      ) : (
        <CheckboxDefault />
      )}
    </div>
  );
}

function useCheckbox({ checked, onChange }: Props) {
  const toggleCheckbox = () => {
    onChange?.(!checked);
  };
  return {
    operations: {
      toggleCheckbox,
    },
  };
}

export function CheckboxInput({
  label,
  checked,
  className,
  onChange,
  required,
}: Props): JSX.Element {
  const { operations } = useCheckbox({ checked, onChange });
  return (
    <div
      className={classNames(
        'font-normal text-body-md text-base-neutral-grey-100 flex items-center w-fit gap-2',
        className
      )}
    >
      <Checkbox
        checked={checked ? CheckboxState.active : CheckboxState.default}
        onClick={operations.toggleCheckbox}
      />
      {label && (
        <Label className='select-none' required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}
