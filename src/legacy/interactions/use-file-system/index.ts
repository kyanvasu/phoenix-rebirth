import { FILESYSTEM, UPLOAD_INTERFACE } from "@kanvas/core";
import { Configuration } from "../../types";

interface GetEntityFilesParams {
  name?: string;
  data?: any[]; // replace 'any' with the actual type of the items in the 'data' array if possible
  systemModuleUUID: string;
  entityUUID: string;
}
export function useFileSystem({ sdk }: Configuration) {
  async function uploadFile({ data }: { data: File }) {
    try {
      const resp: UPLOAD_INTERFACE = await sdk!.filesystem.uploadFile(data);
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
      const resp: string = await sdk!.filesystem.attachFile({
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
    name = "",
    data = [],
    systemModuleUUID,
    entityUUID,
  }: GetEntityFilesParams) {
    try {
      const resp: FILESYSTEM[] = await sdk!.filesystem.getEntityFiles({
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
