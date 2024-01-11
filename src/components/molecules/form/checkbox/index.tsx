'use client';
import React from 'react';
import { Label } from '../../../atoms';
import Icons from '../../../atoms/icons';
import { InputTypes } from '../../../../model/types';
import { useClientContext } from '../../../../client';

export interface Props {
  label?: string;
  checked?: boolean;
  theme?: InputTypes;
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
  theme,
  onChange,
  required,
}: Props): JSX.Element {
  const { operations } = useCheckbox({ checked, onChange });
  const context = useClientContext();

  theme = theme || context.theme.checkBox;

  return (
    <div className={theme?.container} onClick={operations.toggleCheckbox}>
      <Icons.Checkbox active={checked} />
      {label && (
        <Label className={theme?.label} required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}
