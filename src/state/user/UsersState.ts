import { addUserProfile } from "./addUserProfile";
import { getActiveProfile } from "./getActiveProfile";
import { getUserCharacterId } from "./getUserCharacterId";
import { mutateActiveProfile } from "./mutateActiveProfile";
import { updateUserProfileAuthToken } from "./updateUserProfileAuthToken";
import { userLogout } from "./userLogout";

export const UsersState = {
  addUserProfile,
  getActiveProfile,
  getUserCharacterId,
  mutateActiveProfile,
  userLogout,
  updateUserProfileAuthToken,
};
