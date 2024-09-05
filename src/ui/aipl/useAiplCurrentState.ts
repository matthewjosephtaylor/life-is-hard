import { first } from "@mjtdev/engine";
import {
  Chats,
  type AppCharacter,
  type Chat,
  type ChatStateEntry,
} from "ai-worker-common";
import { useEffect, useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";
import { getCurrentChat } from "../chat/getCurrentChat";
import { useCurrentChat } from "../chat/useCurrentChat";
import { createClientSideAiplContext } from "./createClientSideAiplContext";
import {
  getAiplLanguageParams,
  useAiplLanguageParams,
} from "./useAiplLanguageParams";
import type { CHARACTER_FIELDS } from "../playground/node-based-editor/CHARACTER_FIELDS";

export type AiplCurrentState = Readonly<{
  chat: Chat | undefined;
  chatStateEntries: readonly ChatStateEntry[];
  aiplLanguageParams: ReturnType<typeof useAiplLanguageParams>;
  aiplContext?: ReturnType<typeof createClientSideAiplContext>;
  aiplState: Record<string, string | undefined>;
  userCharacter?: AppCharacter;
  assistantCharacter?: AppCharacter;
  characterField?: (typeof CHARACTER_FIELDS)[number];
}>;

export const useAiplCurrentState = () => {
  const { chat } = useCurrentChat();
  const assistantId =
    AppModes.useAppHashParam("assistantId") ?? chat?.aiCharacterId;

  const characterField =
    AppModes.useAppHashParam<(typeof CHARACTER_FIELDS)[number]>(
      "characterField"
    ) ?? "description";

  const chatStateEntries = DataObjectStates.useChildDataObjects(
    chat?.id,
    "chat-state-entry"
  );
  const assistantCharacter =
    DataObjectStates.useDataObject<AppCharacter>(assistantId);
  const userCharacter = first(
    DataObjectStates.useChildDataObjects(
      assistantId,
      "app-character",
      "userCharacter"
    )
  );
  const aiplLanguageParams = useAiplLanguageParams();

  const [result, setResult] = useState<AiplCurrentState>({
    chat: undefined,
    chatStateEntries: [],
    aiplLanguageParams: {},
    aiplContext: undefined,
    aiplState: {},
    characterField: undefined,
  });
  useEffect(() => {
    const aiplState = Chats.chatStateEntriesToFacts(chatStateEntries);
    const aiplContext = createClientSideAiplContext({
      characterId: assistantId,
      fieldName: characterField,
      state: {
        ...aiplState,
        user: userCharacter?.card.data.name,
        assistant: assistantCharacter?.card.data.name,
        char: assistantCharacter?.card.data.name,
      },
    });
    setTimeout(() => {
      setResult({
        chat,
        chatStateEntries,
        aiplLanguageParams,
        aiplContext,
        aiplState,
        userCharacter,
        assistantCharacter,
        characterField,
      });
    }, 1);
  }, [
    chat,
    chatStateEntries,
    aiplLanguageParams,
    userCharacter,
    assistantCharacter,
    assistantId,
    characterField,
  ]);
  return result;
};

// TODO Dry up?
export const getAiplCurrentState = async () => {
  const chat = await getCurrentChat();
  const assistantId =
    AppModes.getAppHashParam("assistantId") ?? chat?.aiCharacterId;
  const characterField =
    AppModes.getAppHashParam("characterField") ?? "description";
  const chatStateEntries = await DataObjectStates.getChildDataObjects(
    chat?.id,
    "chat-state-entry"
  );
  const assistantCharacter = await DataObjectStates.getDataObject<AppCharacter>(
    assistantId
  );
  const userCharacter = first(
    await DataObjectStates.getChildDataObjects(
      assistantId,
      "app-character",
      "userCharacter"
    )
  );
  const aiplLanguageParams = await getAiplLanguageParams();
  const aiplState = Chats.chatStateEntriesToFacts(chatStateEntries);

  const aiplContext = createClientSideAiplContext({
    characterId: assistantId,
    fieldName: characterField,
    state: {
      ...aiplState,
      user: userCharacter?.card.data.name,
      assistant: assistantCharacter?.card.data.name,
      char: assistantCharacter?.card.data.name,
    },
  });

  return {
    chat,
    chatStateEntries,
    aiplLanguageParams,
    aiplContext,
    aiplState,
    userCharacter,
    assistantCharacter,
    characterField,
  };
};
