import { HelpText } from "../../atoms/help-text";
import { translate } from "../../../../translate";

import { EmptyFilePreview } from "./empty-file-preview";
import { Header } from "./header";
import { FilesPreview } from "./files-preview";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  files: File[];
  helpText?: string;
  setFieldValue: any;
  setFieldError: any;
  loading?: boolean;
  titleHeader?: string;
  iconHeader?: React.ReactNode;
  iconEmpty?: React.ReactNode;
  validFilesTypes?: string;
}

export default function UploadFilesInput(props: Props) {
  const { error } = props;

  return (
    <div className="rounded-md border-border-default border-2 ">
      <Header {...props} />
      <FileContentPreview {...props} />
      {error && <ErrorText error={error} />}
    </div>
  );
}

export function FileContentPreview(props: Props) {
  return (
    <div>
      {props?.files.length
        ? <FilesPreview {...props} />
        : <EmptyFilePreview {...props} />}
    </div>
  );
}

export function ErrorText({ error }: { error: boolean }) {
  return (
    <div className="p-4">
      <HelpText error={error}>
        {translate("files.fileValidationsError")}
      </HelpText>
    </div>
  );
}
