import Image from 'next/image';
import { HelpText } from '../../atoms/help-text';
import toast, { Toaster } from 'react-hot-toast';
import Icons from '../../atoms/icons';
import { translate } from '../../../translate';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  files: File[];
  helpText?: string;
  setFieldValue: any;
  setFieldError: any;
  loading?: boolean;
}

const IMAGES_MIME = ['image/jpeg', 'image/png', 'image/gif'];
const APPLICATION_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function UploadFilesInput(props: Props) {
  const { error } = props;

  return (
    <div className='border rounded-md'>
      <Header {...props} />
      <FileContentPreview {...props} />
      {error && <ErrorText error={error} />}
    </div>
  );
}

function FileContentPreview(props: Props) {
  return (
    <div>
      {props?.files.length ? (
        <FilesPreview {...props} />
      ) : (
        <EmptyFilePreview {...props} />
      )}
    </div>
  );
}

function Header(props: Props) {
  return (
    <div className='flex justify-between border'>
      <div className='flex flex-row p-4'>
        <Icons.UploadArrow size={20} />
        <div>
          <label
            className='block mb-2  px-2 text-sm  font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            {translate('leads.uploadDocuments')}
          </label>
        </div>
      </div>
      <div className='order-last'>
        <FileInput {...props} />
      </div>
    </div>
  );
}

function ErrorText({ error }: { error: boolean }) {
  return (
    <div className='p-4'>
      <HelpText error={error}>
        {translate('leads.fileValidationsError')}
      </HelpText>
    </div>
  );
}
function FileInput({ files, setFieldValue }: Props) {
  const handleChange = (event: any) => {
    const newFiles = Array.from(event.target.files);
    const mergeFiles = [...newFiles, ...files];
    if (mergeFiles.length > 5) {
      toast.error(translate('leads.maxFileNumbers'));
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

function UploadButton({
  handleChange,
}: {
  handleChange: (event: any) => void;
}) {
  return (
    <button className='bg-transparent hover:bg-base-primary-40 text-gray-900 font-semibold hover:text-white  px-2 py-1 border border-base-primary-100 hover:border-transparent rounded  w-fit inline-flex items-center'>
      <span className='text-body-md'>Upload</span>
      <input
        max={5}
        className='cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t'
        type='file'
        name='files'
        onChange={handleChange}
      />
    </button>
  );
}

function EmptyFilePreview(props: Props) {
  return (
    <>
      <ul id='gallery' className='flex flex-1 flex-wrap -m-1'>
        <li
          id='empty'
          className='h-full w-full text-center flex flex-col items-center justify-center'
        >
          <Image
            className='mx-auto my-4 w-32'
            src='/images/empty-preview-upload-file.png'
            width={100}
            height={100}
            alt='no data'
          />
          <span className='text-small text-gray-500'>
            {translate('leads.noFileSelected')}
          </span>
          <div>
            <p className='text-small text-gray-500 ' id='file_input_help'>
              {translate('leads.validFilesTypes')}
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}

function FilesPreview(props: Props) {
  const { files } = props;

  return (
    <div className='grid grid-cols-4 p-2   justify-center gap-2'>
      {files?.map((file: any, index: any) => (
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

interface PropsFileItem extends Props {
  index: number;
  file: File;
}

function FilePreviewItem(props: PropsFileItem) {
  const { index, file, files, setFieldError, setFieldValue } = props;
  const handleRemoveFile = () => {
    setFieldValue(
      'files',
      files.filter((f, i) => i !== index)
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

function SelectIconFile(props: { fileMime: string; iconSize: number }) {
  const { fileMime, iconSize } = props;
  // special case for pdf files
  if (APPLICATION_MIME[0] === fileMime)
    return <Icons.UploadPDF size={iconSize} />;

  // all valid images types
  if (IMAGES_MIME.includes(fileMime))
    return <Icons.UploadImage size={iconSize} />;

  // all valid applications types
  if (APPLICATION_MIME.includes(fileMime))
    return <Icons.UploadDoc size={iconSize} />;

  return <Icons.UploadArrow size={iconSize} />;
}
