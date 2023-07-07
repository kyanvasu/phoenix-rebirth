import KanvasCore from '@kanvas/core';
import { PropsWithChildren } from 'react';

export interface Configuration {
  sdk?: KanvasCore;
}

export interface CoreProps extends PropsWithChildren {
  sdk: KanvasCore;
}