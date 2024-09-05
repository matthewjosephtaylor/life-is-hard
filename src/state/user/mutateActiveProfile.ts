import type { AppUserProfile } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { DataObjectStates } from "../data-object/DataObjectStates";
import { getActiveProfile } from "./getActiveProfile";
import { updateUserProfileAuthToken } from "./updateUserProfileAuthToken";

export const mutateActiveProfile = async (
  mutator: (profile: AppUserProfile) => void
) => {
  const activeProfile = await getActiveProfile();
  if (!activeProfile) {
    AppEvents.dispatchEvent("error", "mutateActiveProfile: No active profile");
    return;
  }

  await DataObjectStates.mutateDataObject(activeProfile?.id, mutator);

  return updateUserProfileAuthToken(activeProfile.id);
};
