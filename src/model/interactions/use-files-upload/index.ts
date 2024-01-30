import { useAsyncFn, useList } from 'react-use';
import { useFileSystem } from '@/models/interactions/use-file-system';
import { UPLOAD_INTERFACE } from '@kanvas/core';
import { useSystemModule } from '../use-system-module';

export interface UPLOAD_FILES_INTERFACE {
  entityUUID: string;
  systemModuleSlug: string;
  files: File[];
}

export default function useFilesUpload() {
  const {
    operations: { getSystemModuleBySlug },
  } = useSystemModule();

  const [filesUploaded, { set }] = useList<UPLOAD_INTERFACE>([]);
  const {
    operations: { uploadFile, attachFile },
  } = useFileSystem();

  const [state, execute] = useAsyncFn(
    async ({ entityUUID, systemModuleSlug, files }: UPLOAD_FILES_INTERFACE) => {
      try {
        const uploadPromises = files
          .filter((file): file is File => file !== undefined)
          .map((file) => uploadFile({ data: file }));
        const uploaded = await Promise.all(uploadPromises);
        const systemModule = await getSystemModuleBySlug(systemModuleSlug);
        const systemModuleUuid = systemModule[0]?.uuid ?? '';
        const attachPromises = uploaded.map((file) =>
          attachFile({
            fileSystemUUID: file.uuid,
            entityUUID,
            fieldName: 'filesystem.field_name',
            systemModuleUUID: systemModuleUuid,
          })
        );
        await Promise.all(attachPromises);

        set(uploaded);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    []
  );

  return {
    models: {
      filesUploaded,
      filesUploading: state.loading,
      filesUploadingError: state.error,
    },
    operations: { uploadFiles: execute },
  };
}
