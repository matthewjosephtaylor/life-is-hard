// import { uniqueId } from "ai-worker-common";
// import { Chat } from "./Chat";
// import { ChatMessage } from "./ChatMessage";
// import { createChatMessage } from "./createChatMessage";
// import { updateMessagesState } from "./MessagesState";
// import { getAppState } from "../state/AppState";
// import { DEFAULT_STOP, DEFAULT_STOP_AFTER } from "./DEFAULT_STOP";
// import { DataIndexesStates } from "../backend/index/state/DataIndexesStates";

// // TODO move this to worker-common after removing message-state
// export const createChat = (
//   draft: Partial<Chat> &
//     Partial<{ systemMessage: string | ChatMessage | undefined }> = {},
//   options: Partial<{}> = {}
// ): [Chat, ChatMessage | undefined] => {
//   const {
//     systemMessage,
//     name,
//     userName = "User",
//     aiName = "AI",
//     systemName = "system",
//     maxResponseTokens = getAppState().maxTokens,
//     aiCharacterId,
//     userCharacterId,
//     tags = [],
//     messageIds = [],
//     currentMessageId, // TODO what if already currentMessage?
//     id = uniqueId("chat"),
//     vectorStoreIds,
//     stop = DEFAULT_STOP,
//     stopAfter = DEFAULT_STOP_AFTER,
//     creation = Date.now(),
//     messageIdxId = uniqueId("data-index"),
//     modification = Date.now(),
//   } = draft;

//   const root =
//     typeof systemMessage === "string"
//       ? createChatMessage({
//           chatId: id,
//           role: "system",
//           content: { type: "text", parts: [systemMessage] },
//         })
//       : systemMessage;

//   if (root) {
//     // TODO creating root message needs to await
//     DataIndexesStates.setDataIndexStateRecord(
//       messageIdxId,
//       "chat-message",
//       root
//     );
//     updateMessagesState((state) => {
//       state[root.id] = root;
//     });
//   }

//   return [
//     {
//       stopAfter,
//       stop,
//       tags,
//       currentMessageId: root?.id,
//       id,
//       name,
//       creation,
//       messageIdxId,
//       modification,
//       userName,
//       aiName,
//       systemName,
//       maxResponseTokens,
//       aiCharacterId,
//       userCharacterId,
//       messageIds,
//       vectorStoreIds,
//     },
//     root,
//   ];
// };
