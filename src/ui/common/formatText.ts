import { isUndefined } from "@mjtdev/engine";
import { addNewlinesToText } from "./addNewlinesToText";

export const formatText = (text: string, maxCols = 80) => {
  if (isUndefined(text)) {
    return undefined;
  }
  const lines = text.split("\n");
  return lines
    .map((line) => {
      if (line.length > maxCols) {
        return addNewlinesToText(line, maxCols);
      }
      return line;
    })
    .flat()
    .join("\n");
};
