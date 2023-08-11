import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';
import { Templates } from '@kanvas/phoenix';

function getPathname() {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  return pathname;
}

export default function LeadLayout({ children }: PropsWithChildren) {
  return (
    <Templates.LeadsLayout
      pathname={getPathname()}
      tabs={[{ name: 'Leads', href: '/leads' }]}
      title='Leads'
    >
      {children}
    </Templates.LeadsLayout>
  );
}
