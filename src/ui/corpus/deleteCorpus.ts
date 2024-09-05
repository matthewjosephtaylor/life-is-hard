import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { deleteAllChildCorpusDocuments } from "./deleteAllChildCorpusDocuments";

export const deleteCorpus = async (corpusId: string) => {
  await deleteAllChildCorpusDocuments(corpusId);
  DataObjectStates.deleteDataObject(corpusId);
};


