import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";


export const useNameOfCorpus = (corpusId: string) => {
  const corpus = DataIndexesStates.useUserDataIndexStateRecord(
    "corpus",
    corpusId
  );
  return corpus?.name;
};
