// import { isDefined } from "@mjtdev/engine";
// import { AiCharacter } from "ai-worker-common";
// import { ChatMessage } from "./ChatMessage";
// import { createCardSystemMessage } from "./createCardSystemMessage";

// export const characterToChatSystemMessages = (
//   character: AiCharacter,
//   facts: {
//     char: string | undefined;
//     user: string | undefined;
//   }
// ): ChatMessage[] => {
//   return [
//     createCardSystemMessage(
//       "{{char}} Description",
//       character.card.data.description,
//       facts
//     ),
//     createCardSystemMessage(
//       "{{char}} Personality",
//       character.card.data.personality,
//       facts
//     ),
//     createCardSystemMessage(
//       "Message Examples",
//       character.card.data.mes_example,
//       facts
//     ),
//     createCardSystemMessage(
//       "Context",
//       character.card.data.system_prompt,
//       facts
//     ),
//     createCardSystemMessage("Scenerio", character.card.data.scenario, facts),
//   ].filter(isDefined);
// };
