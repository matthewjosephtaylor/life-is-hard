import { safe } from "@mjtdev/engine";
import type { AiplComponentContextState } from "../src/aipl-components/AiplComponentContextState";

export const createImageGenPromptFromContext = (
  ctx?: AiplComponentContextState
) => {
  const currentObject = safe(() => JSON.stringify(ctx?.componentState), {
    quiet: true,
  });
  const schemaName = ctx?.typeInfo?.schema.$id ?? "";

  const info = `${schemaName} with the following properties: ${currentObject}`;
  return {
    systemMessage:
      "use all image generation prompt engineering techniques to generate the best image possible. Only return the prompt itself!",
    userMessage: `Create an image generation prompt from the following: ${info}`,
  };
};
