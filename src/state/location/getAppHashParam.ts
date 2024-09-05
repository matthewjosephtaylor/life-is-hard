import { isUndefined } from "@mjtdev/engine";
import type { AppHashParamKey } from "./AppHashParamKey";
import { getAppModesAndParams } from "./getAppModesAndParams";

export const getAppHashParam = (
  key: AppHashParamKey,
  defaultValue?: string
) => {
  const result = getAppModesAndParams().hashParams[key];
  if (isUndefined(result)) {
    return defaultValue;
  }
  return result;
};
