import React, { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  Sidebar: ReactNode;
};

export default function BaseLayout({ Sidebar, children }: Props) {
  return (
    <>
      <aside className='flex w-[260px] fixed shrink-0 z-50 h-full'>
        {Sidebar}
      </aside>
      <main className='ml-[260px] w-full relative'>
        {children}
      </main>
    </>
  );
}