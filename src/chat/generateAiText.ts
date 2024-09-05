// import { Objects } from "@mjtdev/engine";
// import { Chat, Chats } from "ai-worker-common";
// import { askRestfulAiCompletionsStream } from "../ai/askRestfulAiCompletionsStream";
// import { AppEvents } from "../event/AppEvents";
// import { getAiChatPrompt } from "../ui/chat/getAiChatPrompt";
// import { waitFor } from "../ui/common/waitFor";
// import { addDirecitonToChat } from "./addDirecitonToChat";
// import { addFunctionsToChat } from "./addFunctionsToChat";
// import { addRagToChat } from "./addRagToChat";
// import { addStreamingChatMessage } from "./addStreamingChatMessage";

// export const generateAiText = async ({
//   chat,
//   userId,
// }: {
//   chat: Chat;
//   userId: string;
// }) => {
//   const consumer = await addStreamingChatMessage({
//     chat,
//     draft: {
//       role: "assistant",
//       name: chat.aiName,
//     },
//     userId,
//   });

//   const messages = Chats.getChatMessages(chat);

//   const chatBuilder = Chats.createChatBuilder({
//     chat,
//     messages: Objects.values(messages),
//   });

//   const aiPrePromptMessage = Chats.getChatMessage(chat, chat.currentMessageId);
//   if (!aiPrePromptMessage) {
//     throw new Error("No AI prePrompt message");
//   }
//   const userQueryMessage = Chats.getChatMessage(
//     chat,
//     aiPrePromptMessage.parent
//   );
//   if (!userQueryMessage) {
//     throw new Error("No user query message");
//   }

//   await addRagToChat({ chatBuilder });
//   addDirecitonToChat({ chatBuilder });
//   addFunctionsToChat({ chatBuilder });

//   const { chat: builtChat, messages: builtMessages } = chatBuilder.get();

//   const prompt = getAiChatPrompt({
//     chat: builtChat,
//     messages: builtMessages,
//   });

//   console.log(prompt);

//   return waitFor(
//     () =>
//       askRestfulAiCompletionsStream({
//         consumer,
//         completionsRequest: {
//           prompt,
//           max_tokens: chat.maxResponseTokens,
//           stop: chat.stop,
//         },
//         onDone: () => {
//           AppEvents.dispatchEvent("finished-generation");
//         },
//       }),
//     {
//       message: "generating...",
//     }
//   );
// };
