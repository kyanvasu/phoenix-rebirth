import React from "react";
import Icons from "../../../atoms/icons";
import { translate } from "../../../../../translate";
import { FileInput } from "../file-input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  files: File[];
  titleHeader?: string;
  icon?: React.ReactNode;
  helpText?: string;
  setFieldValue: any;
  setFieldError: any;
  loading?: boolean;
  iconHeader?: React.ReactNode;
}

export function Header(props: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row p-4">
        {props.icon ?? <Icons.UploadArrow size={20} />}
        <div>
          <label
            className="block mb-2  px-2 text-sm  font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            {props.titleHeader ?? translate("files.uploadDocuments")}
          </label>
        </div>
      </div>
      <div className="order-last">
        <FileInput {...props} />
      </div>
    </div>
  );
}
