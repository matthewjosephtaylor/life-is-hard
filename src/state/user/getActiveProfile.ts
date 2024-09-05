import type { AppUserProfile } from "ai-worker-common";
import { DataObjectStates } from "../data-object/DataObjectStates";
import { AppMessagesState } from "../ws/AppMessagesState";
import { getUserState } from "./UserState";

export const getActiveProfile = async (): Promise<AppUserProfile | undefined> => {
  const { id: userId } = getUserState();
  if (!userId) {
    return undefined;
  }

  const profiles = await DataObjectStates.getChildDataObjects(
    userId,
    "user-profile",
    "active"
  );
  if (profiles.length === 0) {
    console.log("useActiveProfile: finding active profile");
    AppMessagesState.dispatch({
      type: "dataLink:find",
      detail: {
        parentId: userId,
        objectType: "user-profile",
        key: "active",
      },
    });
    return undefined;
  }
  return profiles[0];
};
