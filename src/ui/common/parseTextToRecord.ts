export const parseTextToRecord = (text: string) => {
  const matches = Array.from(text.matchAll(RECORD_REGEX));

  const entries = matches.map((match) => {
    const [_, key, value] = match;
    return [
      key.replaceAll(ENTRY_CLEANER_REGEX, "").trim(),
      value.replaceAll(ENTRY_CLEANER_REGEX, "").trim(),
    ] as const;
  });
  return Object.fromEntries(entries);
};
const RECORD_REGEX = /\s*(.*)\s*:\s(.*)[\s|,]*/gim;
const ENTRY_CLEANER_REGEX = /^"|"$|",$|,$/gi;

export const isRecrodText = (text: string) => {
  const matches = Array.from(text.matchAll(RECORD_REGEX));
  return matches.length > 1;
};
