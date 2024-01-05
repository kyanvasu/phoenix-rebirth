import classNames from 'classnames';
import React from 'react';
import { Label } from '../../../atoms';
import Icons from '../../../atoms/icons';
import { InputStyles } from '../../../../model/types';

export interface Props {
  label?: string;
  checked?: boolean;
  theme?: InputStyles;
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
  theme,
  onChange,
  required,
}: Props): JSX.Element {
  const { operations } = useCheckbox({ checked, onChange });
  return (
    <div
      className={classNames(theme?.container, className)}
      onClick={operations.toggleCheckbox}
    >
      <Icons.Checkbox active={checked} />
      {label && (
        <Label className={theme?.label} required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}
