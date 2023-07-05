'use client';

import { ClientCoreStore } from '@kanvas/phoenix/client'
import { PropsWithChildren } from 'react';
import { sdk } from './layout';

export default function RootClientLayout({ children }: PropsWithChildren) {
  return (
    <ClientCoreStore sdk={sdk}>
      <>{children}</>
    </ClientCoreStore>
  );
}