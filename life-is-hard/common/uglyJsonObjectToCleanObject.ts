import { isDefined, isUndefined } from "@mjtdev/engine";

export const uglyJsonObjectToCleanObject = (
  jsonObject: unknown,
  uglyKey: string
): unknown => {
  if (isUndefined(jsonObject)) {
    return undefined;
  }
  if (Array.isArray(jsonObject)) {
    return uglyJsonObjectToCleanObject(jsonObject[0], uglyKey);
  }
  if (typeof jsonObject === "object" && isDefined(jsonObject)) {
    const keys = Object.keys(jsonObject);
    if (
      keys.length === 1 &&
      keys[0].toLocaleLowerCase() === uglyKey.toLocaleLowerCase()
    ) {
      return jsonObject[keys[0] as keyof typeof jsonObject];
    }
  }
  return jsonObject;
};
