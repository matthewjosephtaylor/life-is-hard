import { type Chat, type ToolConfig } from "ai-worker-common";
import { startClientPerf } from "../../perf/startClientPerf";
import { getCurrentChat } from "../../ui/chat/getCurrentChat";
import { AppMessagesState } from "../ws/AppMessagesState";

export const addChatMessage = async ({
  text,
  audio,
  chat,
  mediaType = "audio/wav",
  toolConfig,
}: {
  chat?: Chat;
  text?: string;
  audio?: ArrayBuffer;
  mediaType?: string;
  toolConfig?: ToolConfig;
}) => {
  const perf = startClientPerf({
    location: "addChatMessage",
  });
  perf.end("start");
  if (!chat) {
    chat = await getCurrentChat();
  }
  perf.end(`got chat: ${chat?.id}`);
  if (!chat) {
    return;
  }

  if (text) {
    AppMessagesState.dispatch({
      type: "chat:addMessage",
      detail: {
        chatId: chat.id,
        abortId: chat.id,
        toolConfig,
        message: {
          name: chat.userName,
          characterId: chat.userCharacterId,

          content: {
            type: "text",
            parts: [text],
          },
        },
      },
    });
    perf.end(text);
  } else if (audio) {
    AppMessagesState.dispatch({
      type: "chat:addMessage",
      detail: {
        chatId: chat.id,
        abortId: chat.id,
        toolConfig,
        message: {
          name: chat.userName,
          characterId: chat.userCharacterId,

          content: {
            type: "audio",
            bytes: audio,
            mediaType,
          },
        },
      },
    });
  }
};
