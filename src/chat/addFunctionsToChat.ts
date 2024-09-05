// // import { getChatMessage } from "../ui/chat/getChatMessage";
// // import { insertChatMessage } from "./insertChatMessage";

// export const AI_FUNCTION_PREFIX = "🧑:";

// // export const addFunctionsToChat = ({
// //   chatBuilder,
// // }: {
// //   chatBuilder: ChatBuilder;
// // }) => {
// //   const { chat, messages } = chatBuilder.get();
// //   const aiPrePromptMessage = getChatMessage(chat.currentMessageId);
// //   if (!aiPrePromptMessage) {
// //     throw new Error("No AI prePrompt message");
// //   }
// //   const orderedMessages = listChatMessages({
// //     messages,
// //     messageId: chat.currentMessageId,
// //   });
// //   const topMessage = orderedMessages[0];
// //   const functionPrompt = createAiFunctionPromptText(chat);
// //   if (isNotEmpty(functionPrompt)) {
// //     chatBuilder.update((chat, messages) =>
// //       insertChatMessage({
// //         chat,
// //         messages,
// //         parent: topMessage.id,
// //         // parent: undefined,
// //         draftMessage: {
// //           role: "system",
// //           content: {
// //             type: "text",
// //             parts: [functionPrompt],
// //           },
// //         },
// //       })
// //     );
// //   }
// // };
