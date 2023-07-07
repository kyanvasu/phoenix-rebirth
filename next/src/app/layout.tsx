import './globals.css'
import KanvasCore from '@kanvas/core'
import RootClientLayout from './client';
import { ServerCoreStore } from '@kanvas/phoenix';

export const sdk = new KanvasCore({
  key: '',
  url: '',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ServerCoreStore sdk={sdk}>
      <RootClientLayout>
        <html lang="en">
          <body>{children}</body>
        </html>
      </RootClientLayout>
    </ServerCoreStore>
  )
}
