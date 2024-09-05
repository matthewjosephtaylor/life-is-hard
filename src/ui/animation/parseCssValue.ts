import { isDefined } from "@mjtdev/engine";

export const parseCssValue = (value: string | number | undefined): number => {
  if (!value) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  const parsed = parseFloat(value);
  return isDefined(parsed) ? parsed : 0;
};
