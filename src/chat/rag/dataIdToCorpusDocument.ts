import type {
  CorpusDocument} from "ai-worker-common";
import {
  IngestDataResult,
  IngestResult,
} from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { Objects, isDefined } from "@mjtdev/engine";

export const dataIdToCorpusDocument = ({
  // ingestResult,
  dataId,
  vectorStoreId,
}: {
  vectorStoreId: string;
  // ingestResult: IngestResult;
  dataId: string;
}): CorpusDocument[] | [] => {
  // const { results } = ingestResult;

  // const r = results[dataId]
  // r.
  // return undefined;
  const vectorStore = DataIndexesStates.getUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  if (!vectorStore) {
    return [];
  }
  return vectorStore.corpusIds
    .map((cid) => {
      const corpus = DataIndexesStates.getUserDataIndexStateRecord(
        "corpus",
        cid
      );
      if (!corpus) {
        return undefined;
      }
      const docIdx = DataIndexesStates.getDataIndexState<CorpusDocument>(
        corpus.documentIdxId
      );
      if (!docIdx) {
        return undefined;
      }
      return Objects.values(docIdx.records).find((cd) => cd.dataId === dataId);
    })
    .filter(isDefined);
};
