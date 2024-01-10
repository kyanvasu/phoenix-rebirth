import React from 'react';
import { Body, Button } from '../../atoms';
import { EmptyStateStyles } from '../../../model/types';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  image: string;
  showButton?: boolean;
  label?: string;
  theme?: EmptyStateStyles;
}

export default function EmptyState({
  image,
  title,
  subtitle,
  showButton = false,
  label,
  onClick,
  className,
  theme,
  ...rest
}: Props) {
  return (
    <article className={theme?.container} {...rest}>
      <img src={image} width={226} height={226} alt='' />
      <section>
        <Body.Three className={theme?.title}>{title}</Body.Three>
        <Body.Three className={theme?.subtitle}>{subtitle}</Body.Three>
      </section>
      {showButton && (
        <Button.Solid className={theme?.button} onClick={onClick}>
          {label}
        </Button.Solid>
      )}
    </article>
  );
}
