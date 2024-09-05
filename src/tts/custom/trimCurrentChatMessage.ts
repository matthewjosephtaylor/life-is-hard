// import type { Chat, ChatMessage } from "ai-worker-common";
// import { Apps } from "ai-worker-common";
// import { detectStopAfter } from "../../chat/detectStopAfter";
// import { getAppState } from "../../state/app/AppState";
// import { DataObjectStates } from "../../state/data-object/DataObjectStates";

// export const trimCurrentChatMessage = (stopAfter: string) => {
//   const { chatId } = getAppState();
//   if (!chatId) {
//     return;
//   }
//   const chat = DataObjectStates.getDataObject<Chat>(chatId);
//   if (!chat) {
//     Apps.error(`trimCurrentChatMessage: no chat for: ${chatId}`);
//     return;
//   }
//   const { currentMessageId } = chat;
//   if (!currentMessageId) {
//     Apps.error(
//       `trimCurrentChatMessage: no ChatMessage for: ${currentMessageId}`
//     );
//     return;
//   }

//   console.log("trimCurrentChatMessage: stoping after", [stopAfter]);
//   DataObjectStates.mutateDataObject<ChatMessage>(currentMessageId, (m) => {
//     if (m.content.type !== "text") {
//       console.warn("unexpected content type while trying to trim");
//       return;
//     }
//     const from = m.content.parts.join("");
//     const [textFragment, stopped] = detectStopAfter(from, [stopAfter]);
//     if (!textFragment) {
//       return;
//     }
//     m.content.parts = [textFragment];
//   });
// };
