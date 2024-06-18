import { CardButtonTypes } from "../../../../model/types";
import { BaseTheme } from "../../../../theme";
import { cloneElement } from "react";

interface Props {
  icon: JSX.Element;
  className?: string;
  theme?: CardButtonTypes;
}

export function CardButton(props: Props) {
  const { icon, theme } = props;
  const styles = theme || BaseTheme.cardButton;

  return (
    <div className={styles.container}>
      {cloneElement(icon, {
        size: 24,
        className: styles.icon,
      })}
    </div>
  );
}
