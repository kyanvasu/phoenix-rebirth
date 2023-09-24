import { UserData } from '@kanvas/core';
import { atomWithStorage } from 'jotai/utils';

export const userProfile = atomWithStorage<UserData | undefined>('user', undefined);
