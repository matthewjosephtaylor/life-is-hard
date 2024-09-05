import type { Chat, ChatMessage } from "ai-worker-common";
import { DataObjectStates } from "../data-object/DataObjectStates";

export const findMessageSiblings = async ({
  chat,
  messageId,
}: {
  chat: Chat;
  messageId: string;
}): Promise<ChatMessage[]> => {
  const messages = await DataObjectStates.getChildDataObjects(
    chat.id,
    "chat-message"
  );

  const message = await DataObjectStates.getDataObject<ChatMessage>(messageId);
  if (!message) {
    return [];
  }
  return messages
    .filter((m) => m.parent === message.parent && m.id !== messageId)
    .sort((a, b) => a.createTime - b.createTime);
};
