// import { createState } from "@mjtdev/engine";
// import { createChat } from "./createChat";
// import { updateMessagesState } from "./MessagesState";

// export type ChatState = ReturnType<typeof getChatState>;

// export const [useChatState, updateChatState, getChatState] = createState(() => {
//   const [chat, root] = createChat({
//     systemMessage:
//       "The following is a conversation with an AI Large Language Model. The AI has been trained to answer questions, provide recommendations, and help with decision making. The AI follows user requests. The AI thinks outside the box.",
//   });
//   if (root) {
//     updateMessagesState((state) => {
//       state[root.id] = root;
//     });
//   }
//   return chat;
// });
