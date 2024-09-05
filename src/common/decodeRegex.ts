export const decodeRegex = (text: string, regex: RegExp | string) => {
  const matches = Array.from(text.matchAll(new RegExp(regex, "mg")));
  return matches.map((m) => m[1]);
};
