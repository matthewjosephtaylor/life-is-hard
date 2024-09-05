
export function capitalizeFirstLetter(text: string): string {
  if (text.length === 0) {
    return text; // Return unchanged if the input is an empty string
  }

  const firstLetter = text.charAt(0).toUpperCase();
  const restOfTheString = text.slice(1);

  return firstLetter + restOfTheString;
}
