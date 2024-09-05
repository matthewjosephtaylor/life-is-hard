import { Objects } from "@mjtdev/engine";
import type { Corpus } from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";


export const useUserCorpora = (): Corpus[] => {
  const idx = DataIndexesStates.useUserDataIndexState("corpus");
  if (!idx) {
    return [];
  }
  return Objects.values(idx.records);
};
