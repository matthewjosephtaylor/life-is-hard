// import { isNotEmpty } from "@mjtdev/engine";
// import { getCharacter } from "../character/getCharacter";
// import { renderCardText } from "../character/renderCardText";
// import { getChatMessage } from "../ui/chat/getChatMessage";
// import { ChatBuilder } from "./createChatBuilder";
// import { insertChatMessage } from "./insertChatMessage";

// export const addDirecitonToChat = ({
//   chatBuilder,
// }: {
//   chatBuilder: ChatBuilder;
// }) => {
//   const { chat } = chatBuilder.get();
//   const aiPrePromptMessage = getChatMessage(chat.currentMessageId);
//   if (!aiPrePromptMessage) {
//     throw new Error("No AI prePrompt message");
//   }
//   const directionText = renderCardText(
//     getCharacter(chat.aiCharacterId)?.card?.data.extensions?.direction,
//     { char: chat.aiName, user: chat.userName }
//   );
//   if (isNotEmpty(directionText)) {
//     chatBuilder.update((chat, messages) =>
//       insertChatMessage({
//         chat,
//         messages,
//         parent: aiPrePromptMessage?.parent,
//         draftMessage: {
//           role: "system",
//           content: {
//             type: "text",
//             parts: [directionText],
//           },
//         },
//       })
//     );
//   }
// };


