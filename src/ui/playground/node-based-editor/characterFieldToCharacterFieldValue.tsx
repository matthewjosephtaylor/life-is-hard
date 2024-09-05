import { isUndefined } from "@mjtdev/engine";
import { type AppCharacter } from "ai-worker-common";
import type { CHARACTER_FIELDS } from "./CHARACTER_FIELDS";


export const characterFieldToCharacterFieldValue = ({
  characterField, character,
}: {
  characterField?: (typeof CHARACTER_FIELDS)[number];
  character?: AppCharacter;
}) => {
  if (isUndefined(character) || isUndefined(characterField)) {
    return undefined;
  }

  switch (characterField) {
    case "greeting": {
      return character.card.data.first_mes;
    }
    case "description": {
      return character.card.data.description;
    }
    case "scenario": {
      return character.card.data.scenario;
    }
    case "personality": {
      return character.card.data.personality;
    }
    case "system": {
      return character.card.data.system_prompt;
    }
    case "pre-chat": {
      return character.card.data.extensions?.preChat;
    }
    case "chat-end": {
      return character.card.data.extensions?.chatEnd;
    }
  }
  throw new Error(`Unknown characterField: ${characterField}`);
};
