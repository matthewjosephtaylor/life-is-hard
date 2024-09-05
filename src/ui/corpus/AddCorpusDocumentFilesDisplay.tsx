import { Dropzone } from "@mjtdev/engine";
import { addCorpusDocumentsWithFilesToParentDataObject } from "./addCorpusDocumentsFilesToParentDataObject";
import type { CSSProperties } from "react";

export const AddCorpusDocumentFilesDisplay = ({
  parentId,
  style,
  inactiveText = "Add Files",
  iconSize = "2em",
}: {
  parentId: string;
  style?: CSSProperties;
  inactiveText?: string;
  iconSize?: string;
}) => {
  return (
    <Dropzone
      key={parentId}
      style={style}
      iconSize={iconSize}
      iconCode="file_upload"
      inactiveText={inactiveText}
      action={(files) => {
        console.log(`adding files to ${parentId}`, [files]);
        addCorpusDocumentsWithFilesToParentDataObject(parentId, files);
      }}
    />
  );
};


