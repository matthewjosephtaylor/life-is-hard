import { IdbKey, Idbs, isDefined } from "@mjtdev/engine";
import { ChatDB } from "../../chat/ChatDB";
import { LoadChatButton } from "./LoadChatButton";
import type { Chat } from "ai-worker-common";

export const chatIdsToLoadButtons = async (chats: Chat[]) => {
  // const chats = (
  //   await Promise.all(
  //     ids.map(async (id) => {
  //       return Idbs.get(ChatDB, id);
  //     })
  //   )
  // )
  //   .filter(isDefined)
  //   .sort((a, b) => {
  //     return b.modification - a.modification;
  //   });

  return chats
    .filter(isDefined)
    .sort((a, b) => {
      return b.modification - a.modification;
    })
    .map((chat, i) => <LoadChatButton chat={chat} />);
};
