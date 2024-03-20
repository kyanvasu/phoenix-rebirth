import { translate } from '../../../../translate';
import React from 'react';

export function UploadButton({
  handleChange,
}: {
  handleChange: (event: any) => void;
}) {
  return (
    <button className='bg-transparent hover:bg-base-primary-40 text-gray-900 font-semibold hover:text-white px-2 py-1 border border-gray-600 hover:border-transparent rounded-lg w-fit inline-flex items-center relative'>
      <span className='text-body-md'>{translate('files.upload')}</span>
      <input
        max={5}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
        type='file'
        name='files'
        onChange={handleChange}
      />
    </button>
  );
}
