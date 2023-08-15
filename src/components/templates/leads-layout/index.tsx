import React from 'react';
import { Heading } from '../../atoms';
import Tabs, { Tab } from '../../molecules/tabs';

interface Props extends React.PropsWithChildren {
  title: string;
  pathname: string;
  tabs: Tab[];
}

export default function LeadsLayout({
  children,
  title,
  pathname,
  tabs,
}: Props) {
  return (
    <section className='flex flex-col px-12 py-6 gap-y-6'>
      <Heading.Three className='font-bold'>{title}</Heading.Three>

      <Tabs className='w-40' tabs={tabs} pathname={pathname} />
      {children}
    </section>
  );
}
