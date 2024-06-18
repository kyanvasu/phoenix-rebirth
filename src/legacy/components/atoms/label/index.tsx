import { LabelHTMLAttributes } from "react";
import { LabelTypes } from "../../../../model/types";
import { BaseTheme } from "../../../../theme";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  theme?: LabelTypes;
}

export function Label({ required = false, children, theme, ...others }: Props) {
  const styles = theme || BaseTheme.label;

  return (
    <label {...others}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}
