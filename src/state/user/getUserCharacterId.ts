import { getActiveProfile } from "./getActiveProfile";

export const getUserCharacterId = async () => {
  const profile = await getActiveProfile();
  return profile?.userCharacterId;
};
