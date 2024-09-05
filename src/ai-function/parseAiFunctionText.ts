import { Arrays } from "@mjtdev/engine";
import { AI_FUNCTION_PREFIX } from "../chat/addFunctionsToChat";


export const parseAiFunctionText = (text: string) => {
  if (!text) {
    return undefined;
  }
  const regex = new RegExp(`${AI_FUNCTION_PREFIX}([a-zA-Z0-9_-]+)\\((.*)\\)`);
  const match = Arrays.from(regex.exec(text) ?? []);
  if (match.length !== 3) {
    return undefined;
  }
  console.log("match", [Array.from(match)]);

  return { name: match[1], arg: match[2] };
};
