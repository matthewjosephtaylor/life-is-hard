// import { getChatMessage } from "../ui/chat/getChatMessage";
// import { ChatBuilder } from "./createChatBuilder";
// import { insertChatMessage } from "./insertChatMessage";
// import { getRagMessageText } from "./rag/getRagMessageText";


// export const addRagToChat = async ({
//   chatBuilder,
// }: {
//   chatBuilder: ChatBuilder;
// }) => {
//   const { chat } = chatBuilder.get();

//   const { vectorStoreIds = [] } = chat;
//   const aiPrePromptMessage = getChatMessage(chat.currentMessageId);
//   if (!aiPrePromptMessage) {
//     throw new Error("No AI prePrompt message");
//   }
//   const userQueryMessage = getChatMessage(aiPrePromptMessage.parent);
//   if (!userQueryMessage) {
//     throw new Error("No user query message");
//   }

//   const ragText = await getRagMessageText({
//     vectorStoreIds,
//     query: userQueryMessage.content.parts[0],
//   });

//   if (ragText) {
//     chatBuilder.update((chat, messages) => insertChatMessage({
//       chat,
//       messages,
//       parent: userQueryMessage?.parent,
//       draftMessage: {
//         role: "system",
//         content: {
//           type: "text",
//           parts: [ragText],
//         },
//       },
//     })
//     );
//   }
// };
