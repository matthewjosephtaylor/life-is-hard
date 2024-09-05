// import { Idbs } from "@mjtdev/engine";
// import { ChatDB } from "./ChatDB";
// import { getChatState, updateChatState } from "./ChatState";
// import { saveChatMessagesState } from "./saveChatMessagesState";
// import { putBackendDataObject } from "../backend/data/putBackendDataObject";
// import { putBackendDataObjects } from "../backend/data/putBackendDataObjects";
// import { findChatMessages } from "./findChatMessages";

// export const saveChatState = async () => {
//   updateChatState((chat) => {
//     chat.modification = Date.now();
//   });
//   const chat = getChatState();
//   await Idbs.put(ChatDB, chat.id, chat);
//   // await putBackendDataObject(chat);
//   // const chatMessages = findChatMessages(chat.id);
//   // await putBackendDataObjects(chatMessages);
//   await saveChatMessagesState(chat.id);
// };
