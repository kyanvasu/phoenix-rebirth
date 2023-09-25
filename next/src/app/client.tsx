'use client';

import { ClientCoreStore } from '@kanvas/phoenix/client';
import { PropsWithChildren } from 'react';
import { sdk } from './layout';
import { Provider } from 'jotai';

export default function RootClientLayout({ children }: PropsWithChildren) {
  return (
    <Provider>
      <ClientCoreStore sdk={sdk}>
        <>{children}</>
      </ClientCoreStore>
    </Provider>
  );
}
