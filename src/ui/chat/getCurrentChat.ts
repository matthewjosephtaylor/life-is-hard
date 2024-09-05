import type { Chat } from "ai-worker-common";
import { getAppState } from "../../state/app/AppState";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";

export const getCurrentChat = async () => {
  // const appInterfaceId = DataObjectStates.getSingletonId("app-interface");
  // const { appInterfaceId } = getAppState();

  // const chatIds = await DataObjectStates.getChildDataObjectIds(
  //   appInterfaceId,
  //   "chat",
  //   "active"
  // );
  // const chatId = chatIds[0];
  const chatId = AppModes.getAppHashParam('chatId')

  return DataObjectStates.getDataObject<Chat>(chatId);
};
