import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";


export const disassociateCorpusFromVectorStore = ({
  vectorStoreId, corpusId,
}: {
  vectorStoreId: string;
  corpusId: string;
}) => {
  DataIndexesStates.updateUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId,
    (v) => {
      v.corpusIds = v.corpusIds.filter((cId) => cId !== corpusId);
    }
  );
};
