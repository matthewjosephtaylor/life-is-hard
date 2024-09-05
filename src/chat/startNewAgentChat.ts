// import { Randoms, isDefined } from "@mjtdev/engine";
// import { AiAgent } from "ai-worker-common";
// import { getCharacter } from "../character/getCharacter";
// import { renderCardText } from "../character/renderCardText";
// import { AppEvents } from "../event/AppEvents";
// import { openErrorPopup } from "../error/openErrorPopup";
// import { ChatMessage } from "./ChatMessage";
// import { updateChatState } from "./ChatState";
// import { createCardSystemMessage } from "./createCardSystemMessage";
// import { createChat } from "./createChat";
// import { saveChatState } from "./saveChatState";
// import {
//   getAgentsState,
//   storeAiAgentsState,
//   updateAgentsState,
// } from "../bot/AgentsState";
// import { characterToChatSystemMessages } from "./characterToChatSystemMessages";
// import { speak } from "../tts/speak";
// import { chooseGreeting } from "./chooseGreeting";

// export const startNewAgentChat = async (
//   agentId: string,
//   options: Partial<{
//     extraUserInfo: any;
//   }> = {}
// ) => {
//   const aiAgent = getAgentsState().agents[agentId];
//   if (!aiAgent) {
//     openErrorPopup(`No agent with ID: ${agentId}`);
//     return;
//   }

//   const aiCharacter = getCharacter(aiAgent.aiCharacterId);
//   const userCharacter = getCharacter(aiAgent.userCharacterId);
//   if (!aiCharacter || !userCharacter) {
//     openErrorPopup("Agent must have both a user and AI character associated");
//     return;
//   }
//   const aiFacts = {
//     char: aiCharacter.card.data.name,
//     user: userCharacter.card.data.name,
//     ...(options?.extraUserInfo || {}),
//   };

//   const userFacts = {
//     char: userCharacter.card.data.name,
//     user: aiCharacter.card.data.name,
//     ...(options?.extraUserInfo || {}),
//   };

//   const aiCharacterSystemMessages = characterToChatSystemMessages(
//     aiCharacter,
//     aiFacts
//   );
//   const userCharacterSystemMessages = characterToChatSystemMessages(
//     userCharacter,
//     userFacts
//   );
//   const { extraUserInfo } = options;

//   const extraInfoSystemMessage = extraUserInfo
//     ? createChatMessage({
//         role: "system",
//         content: {
//           type: "text",

//           parts: [
//             renderCardText(
//               `# {{user}} Information:\n${JSON.stringify(extraUserInfo)}`,
//               aiFacts
//             ),
//           ],
//         },
//       })
//     : undefined;

//   const characterSystemMessages: ChatMessage[] = [
//     ...aiCharacterSystemMessages,
//     ...userCharacterSystemMessages,
//     extraInfoSystemMessage,
//   ].filter(isDefined);

//   let [chat] = createChat({
//     vectorStoreIds: aiAgent.vectorStoreIds,
//     aiName: aiFacts.char,
//     userName: aiFacts.user,
//     aiCharacterId: aiCharacter.id,
//     userCharacterId: userCharacter.id,
//   });

//   const roleplayMessages: ChatMessage[] = [];

//   for (let cardSystemMessage of characterSystemMessages) {
//     let [updatedChat, msg] = addChatMessage(chat, cardSystemMessage);
//     chat = updatedChat;
//     roleplayMessages.push(msg);
//   }

//   const greetings = [
//     aiCharacter.card.data.first_mes,
//     ...(aiCharacter.card.data.alternate_greetings ?? []),
//   ].filter(isDefined);

//   const greeting = chooseGreeting({
//     aiCharacterId: aiCharacter.id,
//     aiFacts,
//     chat,
//     greetings,
//     messages: roleplayMessages,
//   });
//   if (greeting) {
//     chat = greeting.chat;
//     roleplayMessages.push(greeting.message);
//   }

//   updateChatState(() => chat);
//   updateMessagesState((state) => {
//     for (let m of roleplayMessages) {
//       state[m.id] = m;
//     }
//   });
//   await saveChatState();
//   AppEvents.dispatchEvent("new-chat");
//   updateAgentsState((state) => {
//     const a = state.agents[agentId];
//     a.chatIds.push(chat.id);
//   });
//   await storeAiAgentsState();

//   if (greeting) {
//     speak(greeting.renderedGreeting);
//   }

//   return chat;
// };
