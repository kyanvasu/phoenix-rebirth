import { SystemModuleInterface } from '@kanvas/core';
import { Configuration } from '../../types';

export function useSystemModule({ sdk }: Configuration) {
  async function getSystemModuleBySlug(slug: string) {
    try {
      const resp: SystemModuleInterface[] =
        await sdk!.systemModules.getSystemModulesBySlug(slug);
      return resp;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  return {
    operations: {
      getSystemModuleBySlug,
    },
  };
}
