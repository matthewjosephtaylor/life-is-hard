import { toBoolean } from "@mjtdev/engine";


export const isChecked = ({
  aiplName = "", value,
}: {
  aiplName: string | undefined; // like "toppings[pepperoni]" or "pepperoni"
  value: undefined | string | string[]; // like "true" or ["pepperoni", "mushrooms"]
}): boolean => {
  if (Array.isArray(value)) {
    const regex = /\[(.*?)\]/;
    const match = aiplName.match(regex);

    if (match) {
      const checked = value.includes(match[1]);
      return checked;
    }
    return false;
  }
  return toBoolean(value);
};
