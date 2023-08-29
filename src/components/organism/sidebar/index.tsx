import React, { ReactNode } from 'react';
import Icons from '../../atoms/icons';
import NavItem from '../../molecules/nav-item';
import { SidebarItem } from '../../../model/types';
import { Body } from '../../atoms';

type Props = {
  Logo: ReactNode;
  pathname: string;
  items: SidebarItem[];
  companies?: Record<string, any>[];
};

function useSidebar({ items, pathname }: Props) {
  const currentItem = (current: SidebarItem): boolean => {
    if (!pathname) return false;
    const item = items.find((value) => pathname.includes(value.link));
    if (!item) return false;
    return current.key === item.key;
  };

  return {
    currentItem,
  };
}

export default function Sidebar(props: Props) {
  const { items, Logo, companies } = props;
  const { currentItem } = useSidebar(props);

  return (
    <div className='w-full min-h-full shrink-0 flex flex-col bg-base-primary-100'>
      <div className='shrink-0 py-3 px-2'>{Logo}</div>

      <nav className='flex-1 shrink-0 px-2 py-3'>
        <ul role='list' className='flex flex-col flex-1 gap-2'>
          {items.map((item) => (
            <NavItem {...item} active={currentItem(item)} />
          ))}
        </ul>
      </nav>

      {companies && (
        <div className='bg-base-primary-90 border-t border-t-base-primary-70 shrink-0 p-5 cursor-pointer'>
          <ChangeCompany />
        </div>
      )}
    </div>
  );
}

// TODO: translates missing here
function ChangeCompany() {
  return (
    <div className='flex items-center justify-between text-white p-0.5'>
      <Body.Three className='font-semibold'>Change Company</Body.Three>
      <Icons.ChevronLeft className='stroke-white' />
    </div>
  );
}
