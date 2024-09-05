import { DataIndexesStates } from "../backend/index/state/DataIndexesStates";

export const findAvailableVoices = () => {
  const voiceIdx = DataIndexesStates.getUserDataIndexState("voice");
  if (!voiceIdx) {
    return [];
  }
  return Object.values(voiceIdx.records);
};


