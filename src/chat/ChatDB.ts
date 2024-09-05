import type { Idb } from "@mjtdev/engine";
import type { Chat } from "./Chat";

export const ChatDB: Idb<Chat> = {
  dbName: "ai-thing",
  storeName: "chat",
};


