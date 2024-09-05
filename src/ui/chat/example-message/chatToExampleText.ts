// import type { AppCharacter, Chat } from "ai-worker-common";
// import { Chats } from "ai-worker-common";
// import { produce } from "immer";
// import { AppEvents } from "../../../event/AppEvents";
// import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
// import { openCharacterEditor } from "../../character/openCharacterEditor";

// export const chatToExampleText = async (chat: Chat) => {
//   const messages = await DataObjectStates.getChildDataObjects(
//     chat.id,
//     "chat-message"
//   );
//   const listedMessages = Chats.listChatMessages({
//     messages,
//     messageId: chat.currentMessageId,
//   }).filter((m) => m.role !== "system");

//   return listedMessages
//     .map(({ role, content }) => {
//       return `{{${
//         role === "assistant" ? "char" : "user"
//       }}}: ${content.parts.join("")}`;
//     })
//     .join("\n");
// };

// export const chatToCsvTranscript = (chat: Chat) => {
//   const aiCharacter = DataObjectStates.getDataObject<AppCharacter>(
//     chat.aiCharacterId
//   );
//   const userCharacter = DataObjectStates.getDataObject<AppCharacter>(
//     chat.userCharacterId
//   );

//   const messages = DataObjectStates.getChildDataObjects(
//     chat.id,
//     "chat-message"
//   );
//   const aiName = aiCharacter?.card.data.name ?? "AI";
//   const userName = userCharacter?.card.data.name ?? "User";

//   const listedMessages = Chats.listChatMessages({
//     messages,
//     messageId: chat.currentMessageId,
//   }).filter((m) => m.role !== "system");

//   const body = listedMessages.map(({ role, content }) => {
//     return `"${role === "assistant" ? aiName : userName}","${content.parts
//       .join("")
//       .replaceAll('"', '""')}"`;
//   });
//   return [["name", "text"].join(","), ...body].join("\n");
// };

// export const copyChatMessagesAsMessageExamplesToClipboard = (chat: Chat) => {
//   const example = chatToExampleText(chat);
//   navigator.clipboard.writeText(example);
//   AppEvents.dispatchEvent("toast", `chat messages copied to clipboard`);
// };

// export const updateAssistantMessageExamplesUsingChat = (chat: Chat) => {
//   const aiCharacter = DataObjectStates.getDataObject<AppCharacter>(
//     chat.aiCharacterId
//   );
//   if (!aiCharacter) {
//     return;
//   }
//   const example = chatToExampleText(chat);
//   const updatedChar = produce(aiCharacter, (char) => {
//     char.card.data.mes_example = example;
//   });
//   return openCharacterEditor(updatedChar, { defaultTab: "Message Examples" });
// };
