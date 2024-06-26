import Icons from "../../../atoms/icons";

export const IMAGES_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/svg",
  "image/svg+xml",
];
const APPLICATION_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function SelectIconFile(props: { fileMime: string; iconSize: number }) {
  const { fileMime, iconSize } = props;
  // special case for pdf files
  if (APPLICATION_MIME[0] === fileMime) {
    return <Icons.UploadPDF size={iconSize} />;
  }

  // all valid images types
  if (
    IMAGES_MIME.includes(fileMime) ||
    IMAGES_MIME.some((imageMime) => imageMime.split("/")[1] === fileMime)
  ) {
    return <Icons.UploadImage size={iconSize} />;
  }

  // all valid applications types
  if (APPLICATION_MIME.includes(fileMime)) {
    return <Icons.UploadDoc size={iconSize} />;
  }

  return <Icons.UploadArrow size={iconSize} />;
}
