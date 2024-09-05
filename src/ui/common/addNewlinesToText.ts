export const addNewlinesToText = (text: string, maxColumns = 80): string => {
  let result = "";
  let currentLine = "";

  const words = text.split(" ");
  for (const word of words) {
    if (currentLine.length + word.length <= maxColumns) {
      // If adding the current word keeps the line within the limit, add it to the line
      currentLine += word + " ";
    } else {
      // Otherwise, start a new line with the current word
      result += currentLine.trim() + "\n";
      currentLine = word + " ";
    }
  }

  // Add the remaining line to the result
  result += currentLine.trim();

  return result;
};
