import { Idbs, Objects } from "@mjtdev/engine";
import { ChatMessageDB } from "../chat/ChatMessageDB";
import { updateMessagesState } from "../chat/MessagesState";


export const loadChatMessagesState = async () => {
  const ids = await Idbs.list(ChatMessageDB);
  const entries = await Promise.all(
    ids.map(async (id) => {
      const message = await Idbs.get(ChatMessageDB, id);
      return [String(id), message] as const;
    })
  );
  return updateMessagesState((state) => Objects.fromEntries(entries));
};
