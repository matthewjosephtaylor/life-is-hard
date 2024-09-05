import type { AppCharacter, ChatMessage } from "ai-worker-common";
import { memo } from "react";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { ChatMessageDisplay } from "./message/ChatMessageDisplay";
import { stringifyEq } from "./stringifyEq";

export const ChatMessagesDisplay = memo(
  ({
    messages,
    chatId,
    characters,
    enableControls,
  }: {
    chatId: string;
    messages: ChatMessage[];
    characters: Record<string, AppCharacter>;
    enableControls?: boolean;
  }) => {
    // console.log("----------repainting ChatMessagesDisplay !!!!!!----------");
    return (
      <>
        {messages.map((message, i) => {
          return (
            <ChatMessageDisplay
              enableControls={enableControls}
              characters={characters}
              key={message.id}
              message={message}
              onDelete={() => {
                AppMessagesState.dispatch({
                  type: "chat:deleteMessage",
                  detail: {
                    chatId,
                    messageId: message.id,
                  },
                });
              }}
              onChange={(updated) => {
                AppMessagesState.dispatch({
                  type: "chat:insertMessage",
                  detail: {
                    chatId,
                    message: updated,
                    targetId: message.id,
                  },
                });
              }}
            />
          );
        })}
      </>
    );
  },
  (a, b) => {
    const { messages: messagesA, ...aRest } = a;
    const { messages: messagesB, ...bRest } = b;
    const propEq = stringifyEq(aRest, bRest);
    const messageIdsEq = stringifyEq(
      messagesA.map((m) => m.id),
      messagesB.map((m) => m.id)
    );
    return propEq && messageIdsEq;
  }
);
