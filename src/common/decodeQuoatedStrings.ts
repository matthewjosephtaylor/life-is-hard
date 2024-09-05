import { decodeRegex } from "./decodeRegex";

export const decodeQuoatedStrings = (text: string) => {
  const quotedStringsRegex = new RegExp(`"(.*?)"`, "mg");
  return decodeRegex(text, quotedStringsRegex);
};


