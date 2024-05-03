import React from 'react';
import { FilePreviewItem } from '../file-preview-item';

export interface Props {
  files: File[];
  setFieldValue: any;
  setFieldError: any;
}
export function FilesPreview(props: Props) {
  const { files } = props;

  return (
    <div className='grid grid-cols-4 p-2 m-2  justify-center gap-2 rounded-md border-border-default border-2'>
      {files?.map((file: File, index: number) => (
        <FilePreviewItem
          key={`${index}-${file.name}`}
          index={index}
          file={file}
          {...props}
        />
      ))}
    </div>
  );
}
