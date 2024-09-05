import type { AppCharacter} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import type { Chat } from "../../chat/Chat";
import type { ChatMessage } from "../../chat/ChatMessage";
import { condenseToFitBudget } from "../../chat/condenseToFitBudget";
import { listChatMessages } from "../../chat/listChatMessages";

export const getAiChatPrompt = ({
  chat,
  currentNodeId = chat.currentMessageId,
  tokenBudget = 4096,
  charactersBudget = 4096 * 8,
  messages,
  characters,
}: {
  characters: Record<string, AppCharacter | undefined>;
  tokenBudget?: number;
  charactersBudget?: number;
  chat: Readonly<Chat>;
  currentNodeId?: string;
  messages: ChatMessage[];
}) => {
  const orderedMessages = listChatMessages({
    messages,
    messageId: currentNodeId,
  });
  // const messageTexts = Chats.chatMessagesToPromptTextsChatML(orderedMessages);
  const messageTexts = Chats.chatMessagesToPromptTextsChatML({
    characters,
    messages: orderedMessages,
  });
  return condenseToFitBudget(messageTexts, tokenBudget, charactersBudget);
};
