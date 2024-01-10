import classNames from 'classnames';
import React from 'react';
import { BaseTheme } from '../../../theme';
import { CardTypes } from '../../../model/types';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  theme?: CardTypes;
}
export function Card(props: Props) {
  
  const { children, theme } = props;
  const styles = theme || BaseTheme.card;

  return (
    <article className={classNames(styles.container, styles.default)}>
      {children}
    </article>
  );
}
