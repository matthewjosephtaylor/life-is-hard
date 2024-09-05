import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { openSelectCorpusPopup } from "./openSelectCorpusPopup";


export const openAssociateCorpusToVectorStorePopup = async (
  vectorStoreId: string
) => {
  const corpus = await openSelectCorpusPopup();
  if (!corpus) {
    return;
  }

  DataIndexesStates.updateUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId,
    (v) => {
      v.corpusIds.push(corpus.id);
    }
  );
};
