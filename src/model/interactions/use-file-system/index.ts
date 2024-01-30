import { client } from '@/models/api/kanvas-client';
import { FILESYSTEM, UPLOAD_INTERFACE } from '@kanvas/core';

interface GetEntityFilesParams {
  name?: string;
  data?: any[]; // replace 'any' with the actual type of the items in the 'data' array if possible
  systemModuleUUID: string;
  entityUUID: string;
}
export function useFileSystem() {
  async function uploadFile({ data }: { data: File }) {
    try {
      const resp: UPLOAD_INTERFACE = await client.filesystem.uploadFile(data);
      return resp;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function attachFile({
    fileSystemUUID,
    entityUUID,
    fieldName,
    systemModuleUUID,
  }: {
    fileSystemUUID: string;
    entityUUID: string;
    fieldName: string;
    systemModuleUUID: string;
  }) {
    try {
      const resp: string = await client.filesystem.attachFile({
        filesystem_uuid: fileSystemUUID,
        entity_id: entityUUID,
        field_name: fieldName,
        system_module_uuid: systemModuleUUID,
      });
      return resp;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function getEntityFiles({
    name = '',
    data = [],
    systemModuleUUID,
    entityUUID,
  }: GetEntityFilesParams) {
    try {
      const resp: FILESYSTEM[] = await client.filesystem.getEntityFiles({
        name,
        data,
        system_module_uuid: systemModuleUUID,
        entity_id: entityUUID,
      });
      return resp;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  return {
    operations: {
      uploadFile,
      attachFile,
      getEntityFiles,
    },
  };
}
