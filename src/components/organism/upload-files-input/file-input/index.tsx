import { translate } from '../../../../translate';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UploadButton } from '../upload-button';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFieldValue: any;
}

export function FileInput({ files, setFieldValue }: Props) {
  const handleChange = (event: any) => {
    const newFiles = Array.from(event.target.files);
    const mergeFiles = [...newFiles, ...files];
    if (mergeFiles.length > 5) {
      toast.error(translate('files.maxFileNumbers'));
      return;
    }
    setFieldValue('files', mergeFiles);
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <section className='overflow-auto p-4 gap-2 w-full h-full flex flex-col flex-reverse'>
        <UploadButton handleChange={handleChange} />
      </section>
    </>
  );
}
