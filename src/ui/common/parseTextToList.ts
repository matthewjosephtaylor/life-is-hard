import { isNotEmpty } from "@mjtdev/engine";
import { delimCharToDelimRegex } from "./delimCharToDelimRegex";
import { determineListDelimiter } from "./determineListDelimiter";

export const parseTextToList = (text: string | Blob | string[]): string[] => {
  if (Array.isArray(text)) {
    return text;
  }
  if (text instanceof Blob) {
    return [String(text)];
  }
  const delim = determineListDelimiter(text);
  const isMultiline = text.split("\n").length > 1;
  const delimRegex = delimCharToDelimRegex(delim, isMultiline);
  if (isMultiline) {
    return Array.from(text.matchAll(delimRegex))
      .map((match) => {
        return match;
      })
      .map((m) => m[1].trim())
      .filter(isNotEmpty);
  }
  return text
    .split(delimRegex)
    .map((x) => x.trim())
    .filter(isNotEmpty);
};

export const isListText = (text: string) => {
  parseTextToList(text).length > 1;
};
