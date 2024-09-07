import type { AppCharacter, Chat, ToolConfig } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { Returns } from "../../../state/data-object/Returns";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";
import { openSuggestionPopup } from "./openSuggestionPopup";

export const askChatForSuggestions = async ({
  chat,
  toolConfig,
}: {
  chat?: Chat;
  toolConfig?: ToolConfig;
}) => {
  if (!chat) {
    return;
  }
  const userCharacter = await DataObjectStates.getDataObject<AppCharacter>(
    chat?.userCharacterId
  );
  const aiCharacter = await DataObjectStates.getDataObject<AppCharacter>(
    chat?.aiCharacterId
  );

  const userName = userCharacter?.card.data.name ?? "user";
  const aiName = aiCharacter?.card.data.name ?? "AI";

  // open up something quickly on the screen
  openSuggestionPopup({
    chat,
    chatAnswer: undefined,
    toolConfig,
  });

  const streamId = Returns.addStreamListener<string>({
    stream: true,
    onData: (answer) => {
      openSuggestionPopup({
        chat,
        toolConfig,
        chatAnswer: { answer, id: "" },
      });
    },
  });

  const returnId = Returns.addReturnListener<string>({
    onTimeout: () => {
      console.warn("askSuggestions timed out");
    },
    onReturn: (answer) => {
      openSuggestionPopup({
        chat,
        toolConfig,
        chatAnswer: { answer, id: "" },
      });
    },
  });
  AppMessagesState.dispatch({
    type: "chat:ask",
    detail: {
      chatId: chat.id,
      systemMessage: `Examples of numbered list with newlines response:
1. Hello
2. Good Bye
3. Why is the sky blue?
        `,
      userMessage: [
        `Numbered list with newlines response only!`,
        `give 3 things ${userName} might choose to say next in the ongoing conversation.`,
        `Be interesting. Keep in the character of ${userName}.`,
        `Keep it short!`,
        `Focus on what ${aiName} said last!`,
        "If no ideas, just suggest 1. Hello",
      ].join("\n"),
      // assistantMessage,
      returnId,
      streamId,
    },
  });
};
