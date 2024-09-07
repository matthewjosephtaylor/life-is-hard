import { getAppState, useAppState } from "../../state/app/AppState";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { switchWindow } from "../switchWindow";

export const openChat = async (chatId: string) => {
  DataObjectStates.findChildDataObjects(chatId, "chat-message");

  // const appInterfaceId = DataObjectStates.getSingletonId("app-interface");
  const { appInterfaceId } = getAppState();
  if (!appInterfaceId) {
    return;
  }
  const chatIds = await DataObjectStates.getChildDataObjectIds(
    appInterfaceId,
    "chat",
    "active"
    // ["", "active"]
  );
  DataObjectStates.activateLinkInChildren({
    activeId: chatId,
    children: chatIds,
    objectType: "chat",
    parentId: appInterfaceId,
  });

  switchWindow("chat");
};
