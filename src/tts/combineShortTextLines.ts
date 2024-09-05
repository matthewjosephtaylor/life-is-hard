import { isDefined } from "@mjtdev/engine";


export const combineShortTextLines = (lines: string[], minLength = 64) => {
  const groupedLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length < minLength && isDefined(lines[i + 1])) {
      groupedLines.push(lines[i] + lines[i + 1]);
      i++;
      continue;
    }
    groupedLines.push(lines[i]);
  }
  return groupedLines;
};
