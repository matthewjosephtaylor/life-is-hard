import type { AppVoice } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { useUserState } from "../state/user/UserState";

export const useAvailableVoices = (): AppVoice[] => {
  const { id: userId } = useUserState();
  return DataObjectStates.useChildDataObjects(userId, "voice");
};
