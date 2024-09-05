import type { AppUserProfile } from "ai-worker-common";
import { Apps } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { closeAppPopup } from "../popup/closeAppPopup";
import { openAppPopup } from "../popup/openAppPopup";
import { EditUserProfileDialog } from "./EditUserProfileDialog";

export const openEditUserProfile = async (curProfile: AppUserProfile) => {
  const profile = await new Promise<AppUserProfile | undefined>(
    (resolve, reject) => {
      openAppPopup(
        <EditUserProfileDialog
          defaultValue={curProfile}
          onSubmit={(profile) => {
            resolve(profile);
            closeAppPopup();
          }}
        />
      );
    }
  );
  if (!profile) {
    return;
  }

  const { id: userId } = getUserState();
  if (!userId) {
    return Apps.error("openEditUserProfile: no userId");
  }
  DataObjectStates.upsertDataObject({
    objectType: "user-profile",
    draft: profile,
    parentId: userId,
  });

  // const profileId = (await getActiveProfile())?.id;
  // if (profileId) {
  //   updateUserProfileAuthToken(profileId);
  // }
};
