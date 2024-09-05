import type { IngestResult } from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { Datas } from "../../backend/data/Datas";


export const getIngestResult = (vectorStoreId: string) => {
  const vectorStore = DataIndexesStates.getUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  if (!vectorStore) {
    return;
  }
  return Datas.getBackendDataObject<IngestResult>(vectorStore.ingestResultId);
};
