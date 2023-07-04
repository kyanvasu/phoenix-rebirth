import React from 'react';
import { PropsWithChildren } from 'react';
import KanvasCore from '@kanvas/core';
import CoreStore from 'model/store/core.store';

export interface CoreProps extends PropsWithChildren {
  sdk: KanvasCore;
}

export function Core({ children, sdk }: CoreProps) {
  return (
    <CoreStore sdk={sdk}>
      {children}
    </CoreStore>
  );
}