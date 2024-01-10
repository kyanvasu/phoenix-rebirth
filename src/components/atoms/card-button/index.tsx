import React from 'react';
import { CardButtonTypes } from '../../../model/types';
import { BaseTheme } from '../../../theme';

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
      {React.cloneElement(icon, {
        size: 24,
        className: styles.icon,
      })}
    </div>
  );
}
