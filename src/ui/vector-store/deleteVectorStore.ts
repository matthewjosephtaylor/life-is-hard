import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";

export const deleteVectorStore = async (vectorStoreId: string) => {
  return DataIndexesStates.deleteUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
};
