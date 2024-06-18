import { translate } from "../../../../../translate";

export function UploadButton({
  handleChange,
}: {
  handleChange: (event: any) => void;
}) {
  return (
    <button className="bg-transparent hover:bg-base-primary-90 font-semibold hover:text-white px-2 py-1 rounded-md border-border-default  hover:border-transparent  w-fit inline-flex items-center relative">
      <span className="text-body-md">{translate("files.upload")}</span>
      <input
        max={5}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        name="files"
        onChange={handleChange}
      />
    </button>
  );
}
