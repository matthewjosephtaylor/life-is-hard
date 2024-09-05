import { Dropzone } from "@mjtdev/engine";
import type { CSSProperties } from "react";

export const AddFilesDisplay = ({
  parentId,
  style,
  inactiveText = "Add Files",
  iconSize = "2em",
  onAdd,
}: {
  parentId: string;
  style?: CSSProperties;
  inactiveText?: string;
  iconSize?: string;
  onAdd: (files: File[]) => void;
}) => {
  return (
    <Dropzone
      key={parentId}
      style={style}
      iconSize={iconSize}
      iconCode="file_upload"
      inactiveText={inactiveText}
      action={(files) => {
        onAdd(files);
      }}
    />
  );
};
