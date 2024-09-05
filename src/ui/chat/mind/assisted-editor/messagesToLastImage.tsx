import { last, toMany } from "@mjtdev/engine";
import type { FunctionCallResult } from "ai-worker-common";


export const messagesToLastImage = (
  functionCallResults: FunctionCallResult[]
) => {
  let lastImage: undefined | string = undefined;
  let lastImagePrompt: undefined | string = undefined;
  for (const funcResult of functionCallResults) {
    if (funcResult.type !== "image") {
      continue;
    }
    const funcValues = toMany(funcResult.value);
    const content = last(funcValues);
    if (content) {
      lastImagePrompt = funcResult.prompt;
      const b64Image = last(toMany(funcResult.value));
      if (b64Image) {
        lastImage = b64Image;
      }
    }
  }
  // console.log("messagesToLastImage", { lastImage, functionCallResults });
  return { lastImage, lastImagePrompt };
};
