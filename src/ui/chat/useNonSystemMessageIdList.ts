import { listChatMessages } from "../../chat/listChatMessages";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";

export const useNonSystemMessageIdList = (
  chatId: string | undefined,
  messageId: string | undefined
) => {
  const messages = DataObjectStates.useChildDataObjects(chatId, "chat-message");

  return listChatMessages({
    messageId,
    messages,
  })
    .filter((n) => n.role !== "system")
    .map((m) => m.id);
};
