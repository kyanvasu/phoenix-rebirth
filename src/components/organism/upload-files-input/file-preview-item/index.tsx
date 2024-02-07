import React from 'react';
import Icons from '../../../atoms/icons';
import { SelectIconFile } from '../select-icon-file';

export interface PropsFileItem {
  index: number;
  file: File;
  files: File[];
  setFieldValue: any;
  setFieldError: any;
}

export function FilePreviewItem(props: PropsFileItem) {
  const { index, file, files, setFieldError, setFieldValue } = props;
  const handleRemoveFile = () => {
    setFieldValue(
      'files',
      files.filter((_, i) => i !== index)
    );
    setFieldError('files', false);
  };

  return (
    <div key={index} className='flex flex-col border '>
      <div className='flex flex-row-reverse'>
        <div>
          <button
            type='button'
            className='text-base-semantic-warning-90 hover:text-base-semantic-warning-70'
            onClick={handleRemoveFile}
          >
            <div className='flex flex-row p-1'>
              <Icons.XMark
                size={20}
                className='stroke-base-semantic-warning-90'
              />
            </div>
          </button>
        </div>
      </div>
      <div className='flex flex-row justify-center p-2 '>
        <SelectIconFile fileMime={file.type} iconSize={60} />
      </div>
      <div className='flex flex-row justify-center px-4 py-2'>
        <p className=' text-center break-words truncate '>{file.name}</p>
      </div>
    </div>
  );
}
