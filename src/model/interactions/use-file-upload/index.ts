import { useAsyncFn, useList } from 'react-use';
import { useFileSystem } from '@/models/interactions/use-file-system';
import { UPLOAD_INTERFACE } from '@kanvas/core';
import { useSystemModule } from '../use-system-module';
import { useState } from 'react';

export interface UPLOAD_FILES_INTERFACE {
  entityUUID: string;
  systemModuleSlug: string;
  file: File;
}

export default function useFilesUpload() {
  const {
    operations: { getSystemModuleBySlug },
  } = useSystemModule();

  const [fileUploaded, setFileUploaded] = useState<UPLOAD_INTERFACE>(null);
  const {
    operations: { uploadFile, attachFile },
  } = useFileSystem();

  const [state, execute] = useAsyncFn(
    async ({ entityUUID, systemModuleSlug, file }: UPLOAD_FILES_INTERFACE) => {
      try {
        if (!file) setFileUploaded(null);
        const uploaded = await uploadFile({ data: file });
        const systemModule = await getSystemModuleBySlug(systemModuleSlug);
        const systemModuleUuid = systemModule[0]?.uuid ?? '';
        await attachFile({
          fileSystemUUID: uploaded.uuid,
          entityUUID,
          fieldName: 'filesystem.field_name',
          systemModuleUUID: systemModuleUuid,
        });

        setFileUploaded(uploaded);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    []
  );

  return {
    models: {
      fileUploaded,
      fileUploading: state.loading,
      fileUploadingError: state.error,
    },
    operations: { uploadFile: execute },
  };
}
