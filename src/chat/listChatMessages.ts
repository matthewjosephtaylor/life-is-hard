import type { ChatMessage } from "./ChatMessage";

// get a historical list of nodes

export const listChatMessages = ({
  messages,
  messageId,
  acc = [],
}: {
  messages: Readonly<ChatMessage[]>;
  messageId: string | undefined;
  acc?: ChatMessage[];
}): ChatMessage[] => {
  if (!messageId) {
    return acc;
  }
  // const message = messages[messageId];
  const message = messages.find((m) => m.id === messageId);
  if (!message) {
    return acc;
  }
  return listChatMessages({
    messages,
    messageId: message.parent,
    acc: [message, ...acc],
  });
};
