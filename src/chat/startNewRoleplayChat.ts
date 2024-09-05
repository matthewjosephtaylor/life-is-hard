// import { isDefined } from "@mjtdev/engine";
// import { getCharacter } from "../character/getCharacter";
// import { AppEvents } from "../event/AppEvents";
// import { getAppState } from "../state/AppState";
// import { speak } from "../tts/speak";
// import { ChatMessage } from "./ChatMessage";
// import { updateChatState } from "./ChatState";
// import { characterToChatSystemMessages } from "./characterToChatSystemMessages";
// import { chooseGreeting } from "./chooseGreeting";
// import { createChat } from "./createChat";
// import { SelectedCharacters } from "./openCharacterSelectionForm";
// import { saveChatState } from "./saveChatState";

// export const startNewRoleplayChat = async (
//   selections: SelectedCharacters | undefined
// ) => {
//   if (!selections) {
//     return;
//   }
//   const aiCharacter = getCharacter(selections.aiCharacterId);
//   const userCharacter = getCharacter(selections.userCharacterId);
//   if (!aiCharacter || !userCharacter) {
//     console.log("MISSING RP CHARACTERS");
//     return;
//   }

//   const aiFacts = {
//     char: aiCharacter.card.data.name,
//     user: userCharacter.card.data.name,
//   };

//   const userFacts = {
//     char: userCharacter.card.data.name,
//     user: aiCharacter.card.data.name,
//   };

//   const aiCharacterSystemMessages = characterToChatSystemMessages(
//     aiCharacter,
//     aiFacts
//   );
//   const userCharacterSystemMessages = characterToChatSystemMessages(
//     userCharacter,
//     userFacts
//   );

//   const characterSystemMessages: ChatMessage[] = [
//     ...aiCharacterSystemMessages,
//     ...userCharacterSystemMessages,
//   ].filter(isDefined);

//   let [chat, rootMsg] = createChat({
//     aiName: aiFacts.char,
//     userName: aiFacts.user,
//     aiCharacterId: aiCharacter.id,
//     userCharacterId: userCharacter.id,
//     maxResponseTokens: getAppState().maxTokens,
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
//   saveChatState();
//   AppEvents.dispatchEvent("new-chat");

//   if (greeting) {
//     speak(greeting.renderedGreeting);
//   }
//   return chat;
// };
