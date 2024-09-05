import type { Chat, ChatMessage } from "ai-worker-common";
import { DataObjectStates } from "../data-object/DataObjectStates";

export const useChatMessages = (chat: Chat | undefined): ChatMessage[] => {
  return DataObjectStates.useChildDataObjects(chat?.id, "chat-message");
};
