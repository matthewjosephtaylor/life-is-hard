import { Asserts } from "@mjtdev/engine";
import { updateChatState } from "./ChatState";
import { updateMessagesState } from "./MessagesState";
import { saveChatState } from "./saveChatState";

export const deleteMessage = (messageId: string) => {
  updateMessagesState((messages) => {
    //relink and then delete
    // const { chat } = state;
    const message = messages[messageId];
    const children = Object.entries(messages)
      .filter(([id, n]) => n.parent === message.id)
      .map((entry) => entry[1]);

    Asserts.assert(children.length <= 1);
    children.forEach((c) => (c.parent = message.parent));
    updateChatState((chat) => {
      if (chat.currentMessageId === message.id) {
        chat.currentMessageId = message.parent;
      }
    });
    delete messages[messageId];
  });
  return saveChatState();
};
