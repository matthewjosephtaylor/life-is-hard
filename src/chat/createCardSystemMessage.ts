// import { AppObjects } from "ai-worker-common";
// import { renderCardText } from "../character/renderCardText";

// export const createCardSystemMessage = (
//   name: string,
//   text: string = "",
//   facts: Record<string, string | undefined>
// ) => {
//   if (text.trim().length === 0) {
//     return undefined;
//   }
//   const renderedName = renderCardText(name, facts);
//   const ms = AppObjects.create("chat-message", {
//     chatId: undefined,
//     role: "system",
//     name: renderedName,
//     content: {
//       type: "text",
//       parts: [`# ${renderedName}:\n`, renderCardText(text, facts)],
//     },
//   });
//   return ms;
// };
