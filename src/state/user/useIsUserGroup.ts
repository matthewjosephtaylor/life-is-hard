import type { AppUser } from "ai-worker-common";
import { DataObjectStates } from "../data-object/DataObjectStates";
import { useUserState } from "./UserState";

export const useIsUserGroup = (group: string) => {
  const { id } = useUserState();
  const user = DataObjectStates.useDataObject<AppUser>(id);

  return user?.groups?.includes(group) ?? false;
};
