import { TextGens, isDefined, isUndefined } from "@mjtdev/engine";
import type { PromptText } from "./chatMessagesToPromptTextsChatML";

export const condenseToFitBudget = (
  values: readonly PromptText[],
  tokenBudget: number,
  charactersBudget: number
): string => {
  const texts = values.map((v) => v.text).join("\n");
  const tokenCount = TextGens.textToTokens(texts).length;
  if (tokenCount <= tokenBudget && texts.length <= charactersBudget) {
    return texts;
  }
  // const updatedValues = [...values];
  let disposalTarget: number | undefined = undefined;
  for (let i = 0; i < values.length; i++) {
    if (values[i].role !== "system") {
      disposalTarget = i;
      break;
    }
  }
  if (isUndefined(disposalTarget)) {
    return texts;
  }
  const filteredValues = values
    .map((value, i) => {
      if (i === disposalTarget) {
        // console.log(value.text);
        return undefined;
      }
      return value;
    })
    .filter(isDefined);
  // values.forEach((target,i) => {});
  // updatedValues.shift();
  return condenseToFitBudget(filteredValues, tokenBudget, charactersBudget);
};
