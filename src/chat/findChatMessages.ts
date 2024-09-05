import { Objects } from "@mjtdev/engine";
import { Chat } from "./Chat";
import { getMessagesState } from "./MessagesState";

export const findChatMessages = (chatId: string) => {
  const messages = Objects.values(getMessagesState());
  return messages.filter((m) => m.chatId === chatId);
};
