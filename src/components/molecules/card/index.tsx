import React, { PropsWithChildren } from 'react';
import { Body, Button } from '../../atoms';
import classNames from 'classnames';

interface Props extends PropsWithChildren {
  title: string;
  icon: JSX.Element;
  sideIcon?: JSX.Element;
  className?: string;
}

export default function Card(props: Props) {
  const { title, icon, className, children, sideIcon } = props;

  return (
    <article
      className={classNames(
        'border rounded-md  shadow-elevation-1',
        className, {
        'bg-base-neutral-white border-base-neutral-grey-30': !className
      }
      )}
    >
      <section className='flex items-center justify-between h-12 p-3 border-b border-b-base-neutral-grey-30'>
        <span className='flex flex-row gap-x-[10px]'>
          <div className='flex items-center justify-center rounded-[4px] h-6 w-6 bg-base-neutral-grey-10'>
            {React.cloneElement(icon, {
              size: 16,
              className: 'stroke-base-neutral-grey-60',
            })}
          </div>

          <Body.Two className='text-neutral-grey-100'>{title}</Body.Two>
        </span>

        {sideIcon && <SideIcon icon={sideIcon} />}
      </section>
      {children}
    </article>
  );
}

function SideIcon({ icon }: { icon: JSX.Element }) {
  return (
    <Button.Link>
      {React.cloneElement(icon, {
        size: 20,
        className: 'stroke-base-neutral-grey-80',
      })}
    </Button.Link>
  );
}
