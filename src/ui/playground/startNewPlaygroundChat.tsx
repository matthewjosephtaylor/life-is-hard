import { startChatWithCharacters } from "../../state/chat/startChatWithCharacters";
import { AppModes } from "../../state/location/AppModes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { first, isUndefined } from "@mjtdev/engine";

export const startNewPlaygroundChat = async () => {
  const aiCharacterId = AppModes.getAppHashParam("assistantId");
  const userCharacterId = first(
    await DataObjectStates.getChildDataObjectIds(
      aiCharacterId,
      "app-character",
      "userCharacter"
    )
  );
  if (isUndefined(userCharacterId)) {
    console.warn("Refusing to start chat, No user character found");
    return;
  }
  return startChatWithCharacters({
    aiCharacterId,
    userCharacterId,
  });
};
