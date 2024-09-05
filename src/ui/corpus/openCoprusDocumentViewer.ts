import type { CorpusDocument } from "ai-worker-common";
import { openDataIdViewer } from "../../document-view/openDataIdViewer";
import { getDataObject } from "../../state/data-object/DataObjectStates";

export const openCoprusDocumentViewer = async ({
  documentId,
}: {
  documentId: string;
}) => {
  const doc = await getDataObject<CorpusDocument>(documentId);
  if (!doc) {
    return;
  }
  return openDataIdViewer(doc, { title: doc.name });
};
