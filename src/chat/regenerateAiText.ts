
export const regenerateAiText = async (messageId: string) => {
  throw new Error("TBD")
  // let regeneratedMessage: ChatMessage | undefined =
  //   undefined as unknown as ChatMessage;
  // updateMessagesState((messages) => {
  //   const oldMessage = messages[messageId];
  //   assertValue(oldMessage);
  //   regeneratedMessage = createChatMessage({
  //     ...oldMessage,
  //     createTime: Date.now(),
  //     updateTime: Date.now(),
  //     id: uniqueId("chat-message"),
  //     content: {
  //       type: "text",
  //       parts: [],
  //     },
  //   });
  //   messages[regeneratedMessage.id] = regeneratedMessage;
  //   const children = Objects.values(messages).filter(
  //     (m) => m.parent === oldMessage.id
  //   );
  //   //re-parent children to regenerated message
  //   if (!regeneratedMessage) {
  //     return;
  //   }
  //   children.forEach((c) => (c.parent = regeneratedMessage?.id));
  //   // fix currentMessage maybe
  //   updateChatState((chat) => {
  //     chat.currentMessageId =
  //       messageId === chat.currentMessageId
  //         ? regeneratedMessage?.id
  //         : chat.currentMessageId;
  //   });
  // });

  // if (!regeneratedMessage) {
  //   return () => {};
  // }

  // const { stop, stopAfter } = getChatState();

  // const consumer = createAiResponseMessageUpdaterConsumer({
  //   messageId: regeneratedMessage.id,
  //   stop,
  //   stopAfter,
  // });
  // const chat = getChatState();
  // const { aiName, userName, maxResponseTokens } = chat;
  // const prompt = getAiChatPrompt({
  //   chat,
  //   currentNodeId: regeneratedMessage.id,
  // });

  // return waitFor(
  //   () =>
  //     askRestfulAiCompletionsStream({
  //       consumer,
  //       completionsRequest: {
  //         prompt,
  //         max_tokens: maxResponseTokens,
  //         stop: [`${aiName}:`, `${userName}:`, ...DEFAULT_STOP],
  //       },
  //       onDone: () => {
  //         AppEvents.dispatchEvent("finished-generation");
  //       },
  //     }),

  //   {
  //     message: "regenerating...",
  //   }
  // );
};
