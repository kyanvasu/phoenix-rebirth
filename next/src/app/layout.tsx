import './globals.css'
import KanvasCore from '@kanvas/core'
import RootClientLayout from './client';
import { ServerCoreStore } from '@kanvas/phoenix';
import { PropsWithChildren } from 'react';

export const sdk = new KanvasCore({
  key: 'd16459ea-71c2-4732-8f1f-5711c77a7134',
  url: 'https://graphapi.kanvas.dev/graphql',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ServerCoreStore sdk={sdk}>
      <RootClientLayout>
        <html lang="en">
          <body className='flex min-h-screen min-w-full'>{children}</body>
        </html>
      </RootClientLayout>
    </ServerCoreStore>
  )
}
