import { Idbs } from "@mjtdev/engine";
import { updateChatState } from "./ChatState";
import { ChatDB } from "./ChatDB";

export const loadChatState = async (id: string) => {
  const chat = await Idbs.get(ChatDB, id);
  console.log({chat})
  updateChatState(() => chat);
};
