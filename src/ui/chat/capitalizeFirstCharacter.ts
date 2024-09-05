export function capitalizeFirstCharacter(input: string): string {
  if (input.length === 0) {
    return input; // Return the input string unchanged if it's empty
  }

  const firstChar = input.charAt(0).toUpperCase();
  const restOfString = input.slice(1);

  return firstChar + restOfString;
}
