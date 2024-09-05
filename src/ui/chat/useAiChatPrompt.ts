import type { Chat } from "../../chat/Chat";
import type { ChatMessage } from "../../chat/ChatMessage";
import { getAiChatPrompt } from "./getAiChatPrompt";

export const useAiChatPrompt = ({
  chat,
  currentNodeId = chat.currentMessageId,
  tokenBudget = 4096,
  messages,
}: {
  tokenBudget?: number;
  chat: Chat;
  currentNodeId?: string;
  messages: ChatMessage[];
}) => {
  return getAiChatPrompt({
    chat,
    currentNodeId,
    tokenBudget,
    messages,
  });
};
