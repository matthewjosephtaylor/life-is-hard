import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppMessagesState } from "../../state/ws/AppMessagesState";

export const clearChatHistory = async (characterId: string) => {
  const chatIds = await DataObjectStates.getChildDataObjectIds(
    characterId,
    "chat"
  );
  AppMessagesState.dispatch({
    type: "dataObject:delete",
    detail: chatIds,
  });
};
