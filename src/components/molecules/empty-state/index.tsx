import React from 'react';
import classNames from 'classnames';
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
    <article
      className={classNames(theme?.container, {
        'flex flex-col items-center text-center gap-y-8':
          !className && !theme?.container,
        [`${className}`]: !theme?.container && !!className,
      })}
      {...rest}
    >
      <img src={image} width={226} height={226} alt='' />
      <section>
        <Body.Three
          className={classNames(theme?.title, {
            'font-semibold text-base-neutral-grey-100': !theme?.title,
          })}
        >
          {title}
        </Body.Three>
        <Body.Three
          className={classNames(theme?.subtitle, {
            'text-base-neutral-grey-80': !theme?.subtitle,
          })}
        >
          {subtitle}
        </Body.Three>
      </section>
      {showButton && (
        <Button.Solid
          className={classNames(theme?.button, {
            'text-base-neutral-grey-80': !theme?.button,
          })}
          onClick={onClick}
        >
          {label}
        </Button.Solid>
      )}
    </article>
  );
}
