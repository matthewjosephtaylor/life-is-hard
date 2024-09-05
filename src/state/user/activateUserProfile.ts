import { updateUserProfileAuthToken } from "./updateUserProfileAuthToken";

export const activateUserProfile = async (profileId: string) => {
  await updateUserProfileAuthToken(profileId);
};
