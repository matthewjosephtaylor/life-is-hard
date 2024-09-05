import { safe, isUndefined, isDefined, isNotEmpty, Nlps } from "@mjtdev/engine";
import type { FormSkillConfig } from "ai-worker-common";
import { getSelectOptions } from "./getSelectOptions";
import { selectCheckableButton } from "./selectCheckableButton";
import { setCheckboxValues } from "./setCheckboxValues";
import { setVideoValue } from "./setVideoValue";
import { getCurrentChat } from "../ui/chat/getCurrentChat";

export const updateForm = async (data: unknown, config: FormSkillConfig) => {
  const parsedData = safe(() => JSON.parse(data as string)) as Record<
    string,
    unknown
  >;
  console.log("updateForm", parsedData);
  if (isUndefined(parsedData)) {
    return;
  }

  for (const key in parsedData) {
    const parsedDataValue = parsedData[key];
    console.log(`parsedDataValue for ${key}`, parsedDataValue);

    if (Array.isArray(parsedDataValue)) {
      const configKeyValue = config[key];
      let query = 'input[type="checkbox"]';
      const { inputValueType, selector, values } = configKeyValue;
      if (isDefined(configKeyValue)) {
        if (isNotEmpty(selector)) {
          query = selector;
        }
      }

      setCheckboxValues({
        query,
        values: parsedDataValue,
      });
      continue;
    }

    if (typeof parsedDataValue === "string") {
      const configKeyValue = config[key];
      let query: string | undefined = `#${key}`;
      const { inputValueType, selector, values } = configKeyValue;
      if (isDefined(configKeyValue)) {
        query = selector;
      }
      if (inputValueType === "video") {
        setVideoValue({ query, value: parsedDataValue });
      }
      const inputElement = document.querySelector(query) ?? undefined;
      console.log(`inputElement for: ${key}`, inputElement);
      if (isUndefined(inputElement)) {
        console.log(`inputElement not found for: ${key}`);
        continue;
      }

      // Try for select
      if (inputElement instanceof HTMLSelectElement) {
        const options = getSelectOptions(inputElement);
        console.log("options", options);

        const closestAndConfidence = Nlps.valueOfClosestMatch(
          parsedDataValue.toLocaleLowerCase(),
          options.reduce((acc, cur) => {
            return { ...acc, [cur.toLocaleLowerCase()]: cur };
          }, {})
        );
        if (isUndefined(closestAndConfidence)) {
          continue;
        }
        const [closest, confidence] = closestAndConfidence;
        if (confidence > 0.5) {
          inputElement.value = closest;
        }
        continue;
      }
      if (inputElement instanceof HTMLInputElement) {
        inputElement.value = parsedDataValue;
      }
      if (inputElement instanceof HTMLDivElement) {
        inputElement.innerText = parsedDataValue;
      }
      if (inputElement instanceof HTMLSpanElement) {
        inputElement.innerText = parsedDataValue;
      }

      // default to checkable
      selectCheckableButton(query, parsedDataValue);
    }
  }
};
