import { isDefined, isEmpty } from "@mjtdev/engine";
import { decodeQuoatedStrings } from "./decodeQuoatedStrings";
import { decodeRegex } from "./decodeRegex";
import { safeJsonParse } from "./safeJsonParse";

export const looseParse = (text: string): any[] => {
  if (!text || isEmpty(text)) {
    return [];
  }
  // const quotedStringsRegex = new RegExp(`{(.*?)}`, "mg");
  // const matches = Array.from(text.matchAll(quotedStringsRegex));
  // const matches = decodeRegex(text, `{(.*?)}`);
  const objMaybe =
    safeJsonParse(text) ??
    safeJsonParse(`{${text}}`) ??
    safeJsonParse(`${text}}`) ??
    safeJsonParse(`{${text}`);

  if (isDefined(objMaybe)) {
    return [objMaybe];
  }
  const regexes = [`{(.*?)}`, `"(.*?)"`];

  for (const regex of regexes) {
    const decoded = decodeRegex(text, regex);
    if (decoded.length > 0) {
      return decoded.map((p) => looseParse(p));
    }
  }
  return [text];
};
