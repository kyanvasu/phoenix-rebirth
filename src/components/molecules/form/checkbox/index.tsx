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
      onClick={operations.toggleCheckbox}
    >
      <Checkbox
        checked={checked ? CheckboxState.active : CheckboxState.default}
      />
      {label && (
        <Label className='select-none' required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}

function Checkbox({ checked }: { checked: CheckboxState }) {
  if (checked === CheckboxState.active) {
    return <CheckboxSelected />;
  }
  return <CheckboxDefault />;
}
