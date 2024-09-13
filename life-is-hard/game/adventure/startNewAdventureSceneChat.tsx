import { AiplClients } from "../../../src/client/AiplClients";
import { nameOfValue } from "../../common/nameOfValue";
import { createActiveGoalsEntitiesSystemMessage } from "../../entity/createActiveGoalsEntitiesSystemMessage";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { createAllTypesSystemMessage } from "../../entity/createAllTypesSystemMessage";
import { getCurrentLocation } from "../../useCurrentLocation";
import { getPc } from "../../usePc";
import { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";

let startingChat = false;
export const startNewAdventureSceneChat = () => {
  if (startingChat) {
    return;
  }
  startingChat = true;
  const pc = getPc();
  const currentLocation = getCurrentLocation();
  const startChatSystemMessage = [
    createAllTypesSystemMessage(),
    createAllEntitiesSystemMessage(),
    createActiveGoalsEntitiesSystemMessage(),
    `The user/player character is ${nameOfValue(pc?.object)}`,
    `The user/player is at ${nameOfValue(currentLocation?.object)}`,
    "You are the game master for this adventure.",
    "be creative and have the user/player character interact with the world.",
    "Use natural language only when communicating with the user/player character unless specifically asked for JSON.",
    "Update the goals and give rewards as needed when goals or parts of goals are completed.",
    "Focus on helping the user/player achieve their goals and have fun.",
  ].join("\n");

  const client = AiplClients.createAiplClient();

  client
    .startChat({
      schema: ADVENTURE_SCENE_TYPE_INFO.schema,
      systemMessage: startChatSystemMessage,
    })
    .then(() => {
      client.addChatUserMessage({
        text: "Where am I, what are my goals, and what can I do?",
        toolConfig: { schema: ADVENTURE_SCENE_TYPE_INFO.schema },
      });
    });
  startingChat = false;
};
