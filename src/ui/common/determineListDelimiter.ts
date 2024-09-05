import { isEmpty } from "@mjtdev/engine";

export const determineListDelimiter = (text: string): string | undefined => {
  if (isEmpty(text)) {
    return undefined;
  }
  const regex = /^\s*([^\s^a-z^A-Z])/gm;
  const matches = text.matchAll(regex);

  for (const match of matches) {
    const delimiter = match[1];
    return delimiter;
  }

  return undefined;
};
