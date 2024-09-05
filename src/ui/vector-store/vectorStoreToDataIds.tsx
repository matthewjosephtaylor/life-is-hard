import { isDefined } from "@mjtdev/engine";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import type { CorpusDocument, VectorStore } from "ai-worker-common";


export const vectorStoreToDataIds = (vectorStore: VectorStore) => {
  const { corpusIds } = vectorStore;
  const corpusDocumentIdxIds = corpusIds
    .map((corpusId) => DataIndexesStates.getUserDataIndexStateRecord("corpus", corpusId)
    )
    .map((corpus) => corpus?.documentIdxId)
    .filter(isDefined);

  const result: string[] = [];
  for (const idxId of corpusDocumentIdxIds) {
    const idx = DataIndexesStates.getDataIndexState<CorpusDocument>(idxId);
    if (!idx) {
      continue;
    }
    result.push(
      ...Object.values(idx.records)
        .map((r) => r.dataId)
        .filter(isDefined)
    );
  }
  return result;
};
