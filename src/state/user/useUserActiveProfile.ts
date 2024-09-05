import { DataObjectStates } from "../data-object/DataObjectStates";
import { useUserState } from "./UserState";

export const useUserActiveProfile = () => {
  const { id: userId } = useUserState();

  const profiles = DataObjectStates.useChildDataObjects(
    userId,
    "user-profile",
    "active"
  );
  if (profiles.length === 0) {
    return undefined;
  }
  if (!userId) {
    return undefined;
  }
  return profiles[0];
};
