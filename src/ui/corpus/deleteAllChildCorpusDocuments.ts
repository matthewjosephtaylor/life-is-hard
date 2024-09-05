import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { deleteCorpusDocument } from "./deleteCorpusDocument";

export const deleteAllChildCorpusDocuments = async (parentId: string) => {
  const documents = await DataObjectStates.getChildDataObjectIds(
    parentId,
    "corpus-document"
  );
  for (const document of documents) {
    await deleteCorpusDocument(document);
  }
  AppMessagesState.dispatch({
    type: "vector:deleteNamespace",
    detail: parentId,
  });
};
