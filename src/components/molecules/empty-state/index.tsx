import React from 'react';
import classNames from 'classnames';
import { Body, Button } from '../../atoms';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  image: string;
  showButton?: boolean;
  label?: string;
}

export default function EmptyState({
  image,
  title,
  subtitle,
  showButton = false,
  label,
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <article
      className={classNames(
        'flex flex-col items-center text-center gap-y-8',
        className
      )}
      {...rest}
    >
      <img src={image} width={226} height={226} alt='' />
      <section>
        <Body.Three className='font-semibold text-base-neutral-grey-100'>
          {title}
        </Body.Three>
        <Body.Three className='text-base-neutral-grey-80'>
          {subtitle}
        </Body.Three>
      </section>
      {showButton && <Button.Solid onClick={onClick}>{label}</Button.Solid>}
    </article>
  );
}
