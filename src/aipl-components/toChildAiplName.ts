import { isUndefined } from "@mjtdev/engine";


export const toChildAiplName = (aiplName: string | undefined) => {
  if (isUndefined(aiplName)) {
    return;
  }
  const regex = /\[(.*?)\]/;
  const match = aiplName.match(regex);

  if (match) {
    return match[1];
  }
  return aiplName;
};
