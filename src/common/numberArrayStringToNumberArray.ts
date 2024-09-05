import { isDefined, isUndefined, safe } from "@mjtdev/engine";

export const numberArrayStringToNumberArray = (
  value: string | number[] | undefined
): number[] => {
  if (isUndefined(value)) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  const values = value.split(/,\s?/);
  return values.map((v) => safe(() => Number(v))).filter(isDefined);
};
