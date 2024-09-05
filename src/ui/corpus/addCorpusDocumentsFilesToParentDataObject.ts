import { addCorpusDocumentWithFileToParentDataObject } from "./addCorpusDocumentWithFileToParentDataObject";

export const addCorpusDocumentsWithFilesToParentDataObject = async (
  parentId: string,
  files: File[]
) => {
  await Promise.all(
    files.map(async (f) => addCorpusDocumentWithFileToParentDataObject(parentId, f))
  );
};
