import { DataObjectStates } from "../data-object/DataObjectStates";
import { disconnectWs } from "../ws/disconnectWs";
import { removeUserState, storeUserState, updateUserState } from "./UserState";

export const userLogout = async () => {
  await removeUserState();
  DataObjectStates.resetDataObjectStates();
  disconnectWs();
  location.reload();
};
