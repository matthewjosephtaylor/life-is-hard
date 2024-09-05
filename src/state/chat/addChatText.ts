// import type { Chat, ChatRole, ChatMessage } from "ai-worker-common";
// import { ChatStates } from "./ChatStates";

// export const addChatText = async (params: {
//   chat: Chat;
//   text: string;
//   name?: string;
//   characterId?: string;
//   role?: ChatRole;
// }): Promise<void> => {
//   const { chat, role = "user" } = params;
//   const {
//     text,
//     characterId = chat.userCharacterId,
//     name = chat.userName,
//   } = params;
//   return ChatStates.addChatMessage({
//     chat,
//     draft: {
//       name,
//       role,
//       characterId,
//       content: {
//         type: "text",
//         parts: [text],
//       },
//     },
//   });
// };
