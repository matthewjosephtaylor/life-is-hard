import { isUndefined } from "@mjtdev/engine";
import type { AppHashParamKey } from "./AppHashParamKey";
import { useAppModesAndParams } from "./useAppModesAndParams";

export const useAppHashParam = <T extends string>(
  key: AppHashParamKey,
  defaultValue?: T
) => {
  const result = useAppModesAndParams().hashParams[key] as T;
  if (isUndefined(result)) {
    return defaultValue;
  }
  return result;
};
