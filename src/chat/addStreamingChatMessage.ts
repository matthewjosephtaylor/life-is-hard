import type { Chat} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import type { ChatMessage } from "./ChatMessage";
import { createAiResponseMessageUpdaterConsumer } from "./createAiResponseMessageUpdaterConsumer";

export const addStreamingChatMessage = async ({
  draft = {},
  chat,
  userId,
}: {
  chat: Chat;
  userId: string;
  draft: Partial<ChatMessage>;
}) => {
  const message = await Chats.addChatMessage({ chat, userId, draft });

  return createAiResponseMessageUpdaterConsumer({
    messageId: message.id,
    stop: chat.stop,
    stopAfter: chat.stopAfter,
  });
};
