import { isUndefined } from "@mjtdev/engine";


export const constrainString = <T extends string>({
  value, possibles, defaultValue,
}: {
  defaultValue: T;
  value: string | undefined;
  possibles: readonly T[];
}): T => {
  if (isUndefined(value)) {
    return defaultValue;
  }
  for (const possible of possibles) {
    const regex = new RegExp(`${possible}`, "i");
    if (regex.test(value)) {
      return possible;
    }
  }
  return defaultValue;
};
