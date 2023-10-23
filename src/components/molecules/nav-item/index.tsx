import React from 'react';
import { SidebarItem } from '../../../model/types';
import classnames from 'classnames';
import { Body, Icons } from '../../atoms';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

type Props = {
  item: SidebarItem;
  active?: boolean;
  pathname: string;
  className?: string;
};

export default function NavItem({ pathname, active, item, className }: Props) {
  let isOpen = false;
  const isItemActive = isOpen || active;

  const hasChildren = item.children && item.children.length;
  const iconColor = !isItemActive ? 'stroke-white' : 'stroke-base-primary-100';

  const container = classnames('rounded-md', {
    'bg-base-primary-90 text-base-primary-30 hover:text-white':
      !isOpen && !isItemActive,
    'bg-base-primary-10 text-base-primary-100': isOpen || isItemActive,
    className,
  });

  return (
    <>
      {hasChildren ? (
        <Menu>
          {({ open }) => {
            isOpen = open;
            return (
              <>
                <Menu.Button
                  as='div'
                  className={classnames(
                    `flex flex-row gap-2.5 py-2.5 px-3.5 cursor-pointer ${container}`,
                    className
                  )}
                >
                  <item.Icon className={iconColor} size={20} />
                  <Body.Three
                    className={classnames('font-semibold', className)}
                  >
                    {item.title}
                  </Body.Three>
                  <span
                    className={`ml-auto transition-transform transform ${
                      open ? 'rotate-90' : ''
                    }`}
                  >
                    <Icons.ChevronRight size={20} className={iconColor} />
                  </span>
                </Menu.Button>
                <Menu.Items className='space-y-2 mx-auto'>
                  {item.children?.map((childItem, index) => {
                    const isChildActive = pathname?.includes(childItem.link);

                    return (
                      <NavItem
                        item={childItem}
                        key={index}
                        pathname={pathname}
                        active={isChildActive}
                        className={classnames('w-52', className)}
                      />
                    );
                  })}
                </Menu.Items>
              </>
            );
          }}
        </Menu>
      ) : (
        <Link
          href={item.link}
          className={classnames(
            'flex flex-row gap-2.5 py-2.5 px-3.5 ',
            container,
            className
          )}
        >
          <item.Icon className={iconColor} size={20} />
          <Body.Three className={classnames('font-semibold', className)}>
            {item.title}
          </Body.Three>
        </Link>
      )}
    </>
  );
}
