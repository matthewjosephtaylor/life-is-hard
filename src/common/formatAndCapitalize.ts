// @see https://chat.openai.com/c/40eaf0a4-16b0-4cc8-a60c-934180968072
export const formatAndCapitalize = (input: string): string => {
  // Helper function to capitalize the first letter of a word
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  // Check if the string is in camelCase by looking for lowercase followed by uppercase pattern
  const isCamelCase = /[a-z][A-Z]/.test(input);

  let words: string[];

  if (isCamelCase) {
    // Split camelCase string into words
    words = input.split(/(?=[A-Z])/).map((word) => word.toLowerCase());
  } else {
    // Split normal string into words
    words = input.split(" ").map((word) => word.toLowerCase());
  }

  // Capitalize the first letter of each word and join them with spaces
  return words.map(capitalize).join(" ");
};
