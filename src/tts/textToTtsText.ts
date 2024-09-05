import { escapeRegExp } from "../chat/escapeRegExp";


export const textToTtsText = (text: string) => {
  const allowedPunctuations = ["!", ",", ".", "?", "'"].map(escapeRegExp);

  const regex = `[^${allowedPunctuations.join("|")}a-zA-Z0-9 ]`;

  return text
    .replaceAll(new RegExp(regex, "g"), " ")
    .replaceAll(/\s+/g, " ")
    .trim();
};
