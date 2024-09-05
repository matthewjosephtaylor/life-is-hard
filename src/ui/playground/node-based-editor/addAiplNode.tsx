import { isUndefined } from "@mjtdev/engine";
import type { AiplNode } from "ai-worker-common";
import { AIPL_CODE_GENERATORS } from "./aipl-node/AIPL_CODE_GENERATORS";
import { AppEvents } from "../../../event/AppEvents";
import { getAiplCurrentState } from "../../aipl/useAiplCurrentState";


export const addAiplNode = async (aiplNode: Partial<AiplNode>) => {
  const generator = AIPL_CODE_GENERATORS[aiplNode.type as keyof typeof AIPL_CODE_GENERATORS];
  if (isUndefined(generator)) {
    return;
  }

  // @ts-ignore
  const generated = generator(aiplNode);
  console.log("generated", generated);

  const { characterField, assistantCharacter, aiplLanguageParams } = await getAiplCurrentState();

  if (isUndefined(characterField) || isUndefined(assistantCharacter)) {
    return;
  }

  AppEvents.dispatchEvent("aiplEditorUpdate", {
    characterId: assistantCharacter.id,
    fieldName: characterField,
    value: (cur) => [generated, cur].join("\n"),
  });
};
