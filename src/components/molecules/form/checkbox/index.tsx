import React from 'react';
import { Label } from '../../../atoms';
import Icons from '../../../atoms/icons';
import { InputTypes } from '../../../../model/types';
import { BaseTheme } from '../../../../theme';

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
  onChange,
  required,
  theme,
}: Props): JSX.Element {
  const { operations } = useCheckbox({ checked, onChange });

  const styles = theme || BaseTheme.checkBox;

  return (
    <div className={styles?.container} onClick={operations.toggleCheckbox}>
      <Icons.Checkbox active={checked} />
      {label && (
        <Label className={styles?.label} required={required}>
          {label}
        </Label>
      )}
    </div>
  );
}
