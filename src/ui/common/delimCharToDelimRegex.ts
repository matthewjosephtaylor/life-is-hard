import { isUndefined } from "@mjtdev/engine";

export const delimCharToDelimRegex = (
  delimChar: string | undefined,
  isMultiline: boolean
) => {
  // return new RegExp("\n", "ig");
  if (isUndefined(delimChar)) {
    return new RegExp("\n(.*)", "igm");
  }
  if (isMultiline) {
    if (/[0-9]/.test(delimChar)) {
      return new RegExp("^\\s*?[0-9]+\\.?\\)?\\s*(.*)", "igm");
    }
    return new RegExp(`^\\${delimChar}+(.*)`, "igm");
  }
  if (/[0-9]/.test(delimChar)) {
    return new RegExp("[0-9]+\\.?\\)?", "ig");
  }
  return new RegExp(",", "ig");
};
