import Image from 'next/image';
import { translate } from '../../../../translate';
import React from 'react';

interface Props {
  icon?: React.ReactNode;
  validFilesTypes?: string;
}

export function EmptyFilePreview(props: Props) {
  return (
    <div className='mb-4'>
      <ul id='gallery' className='flex flex-1 flex-wrap'>
        <li
          id='empty'
          className='h-full w-full text-center flex flex-col items-center justify-center'
        >
          {' '}
          {props.icon ?? (
            <Image
              className='mx-auto my-4 w-32'
              src='/images/empty-preview-upload-file.png'
              width={100}
              height={100}
              alt='no data'
            />
          )}
          <span className='text-small text-gray-500'>
            {translate('files.noFileSelected')}
          </span>
          <div>
            <p className='text-small text-gray-500 ' id='file_input_help'>
              {props.validFilesTypes ?? translate('files.validFilesTypes')}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
