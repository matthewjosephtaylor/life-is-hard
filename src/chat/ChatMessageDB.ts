import type { Idb } from "@mjtdev/engine";
import type { ChatMessage } from "./ChatMessage";


export const ChatMessageDB: Idb<ChatMessage> = {
  dbName: "ai-thing",
  storeName: "chat-message",
};
