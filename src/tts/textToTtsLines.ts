import { escapeRegExp } from "../chat/escapeRegExp";
import { isNotEmpty } from "@mjtdev/engine";
import { combineShortTextLines } from "./combineShortTextLines";

export const MIN_TTS_LINE_LENGTH = 4;
export const TTS_LINE_DELIMITERS = [".", "\n", "?", "!", ","];
const escapedDelimiters = TTS_LINE_DELIMITERS.map(escapeRegExp);
export const TTS_LINE_REGEX = new RegExp(
  `(.*?)(${escapedDelimiters.join("|")})`,
  "msg"
);

export const textToTtsLines = (text: string | undefined) => {
  if (!text) {
    return [];
  }
  const matches = Array.from(text.matchAll(TTS_LINE_REGEX));
  if (matches.length === 0 && text.length > 0) {
    return [text];
  }

  // group short matches together
  const lines = matches.map((match) => {
    const before = match[1];
    const delimiter = match[2];
    return `${before}${delimiter}`;
  });

  let groupedLines = combineShortTextLines(lines, MIN_TTS_LINE_LENGTH);
  for (let i = 0; i < 2; i++) {
    groupedLines = combineShortTextLines(groupedLines, MIN_TTS_LINE_LENGTH);
    groupedLines = combineShortTextLines(groupedLines, MIN_TTS_LINE_LENGTH);
  }
  return groupedLines.map((l) => l.trim()).filter(isNotEmpty);
};
