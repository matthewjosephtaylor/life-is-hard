import { Apps } from "ai-worker-common";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { getUserState } from "../../state/user/UserState";

export const deleteUserProfile = (profileId: string) => {
  const { id: userId } = getUserState();
  if (!userId) {
    return Apps.error("deleteUserProfile: no userId");
  }

  AppMessagesState.dispatchAll([
    {
      type: "dataLink:delete",
      detail: {
        parentId: userId,
        childId: profileId,
      },
    },
    {
      type: "dataObject:delete",
      detail: profileId,
    },
  ]);
};
