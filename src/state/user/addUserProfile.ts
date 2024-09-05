import { AppObjects } from "ai-worker-common";
import { openEditUserProfile } from "../../ui/user/openEditUserProfile";

export const addUserProfile = () => {
  const profile = AppObjects.create("user-profile");
  return openEditUserProfile(profile);
};
