import React from 'react';
import classNames from 'classnames';

export type Tab = {
  name?: string;
  href: string;
};

interface Props {
  tabs?: Tab[];
  icon?: React.ReactNode;
  pathname: string;
  className: string;
}

export default function Tabs(props: Props) {
  const { tabs = [], icon, className, pathname } = props;

  return (
    <nav className='flex -mb-px'>
      {tabs.map((tab) => {
        return (
          <a
            key={tab.name}
            href={tab.href}
            className={classNames(
              'flex gap-[10px] border-b-2 justify-center items-center w-1/2 h-10 py-[9px] px-[19px] text-body-md font-semibold',
              {
                'text-base-primary-100 border-base-primary-100':
                  pathname.startsWith(tab.href),
                'text-base-neutral-grey-60 border-b border-b-base-neutral-grey-30 hover:text-base-neutral-grey-80 border-transparent hover:border-base-neutral-grey-50':
                  !pathname.startsWith(tab.href),
              },
              className
            )}
          >
            {icon && icon}

            {tab.name}
          </a>
        );
      })}
    </nav>
  );
}
