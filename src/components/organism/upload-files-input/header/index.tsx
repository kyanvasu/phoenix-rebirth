import React from 'react';
import Icons from '../../../atoms/icons';
import { translate } from '../../../../translate';
import { FileInput } from '../file-input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  files: File[];
  helpText?: string;
  setFieldValue: any;
  setFieldError: any;
  loading?: boolean;
}

export function Header(props: Props) {
  return (
    <div className='flex justify-between border'>
      <div className='flex flex-row p-4'>
        <Icons.UploadArrow size={20} />
        <div>
          <label
            className='block mb-2  px-2 text-sm  font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            {translate('files.uploadDocuments')}
          </label>
        </div>
      </div>
      <div className='order-last'>
        <FileInput {...props} />
      </div>
    </div>
  );
}
