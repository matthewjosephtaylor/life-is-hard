import { Arrays, Objects, isDefined, isUndefined } from "@mjtdev/engine";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";
import { HASH_PARAM_PREFIX } from "./HASH_PARAM_PREFIX";
import { keyValueToHashToken } from "./keyValueToHashToken";
import type { AppHashParamKey } from "./AppHashParamKey";
import type { AppMode } from "./AppLocationState";

export const removeHashParam = (key: AppHashParamKey) => {
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  const paramsAsToken = Objects.entries(hashParams)
    .filter((entry) => entry[0] !== key)
    .map(
      ([key, value]) => `${HASH_PARAM_PREFIX}${keyValueToHashToken(key, value)}`
    );

  setLocationFromModesAndHashParams({
    modes,
    hashParams: Objects.omit(hashParams, key),
  });

  // location.hash = Arrays.from(new Set([...modes, ...paramsAsToken])).join(",");
};

export const setLocationFromModesAndHashParams = ({
  modes,
  hashParams,
}: {
  modes: AppMode[];
  hashParams: Partial<Record<AppHashParamKey, string>>;
}) => {
  const paramsAsToken = Objects.entries(hashParams)
    .map(([key, value]) => {
      if (isUndefined(value)) {
        return undefined;
      }
      return `${HASH_PARAM_PREFIX}${keyValueToHashToken(key, value)}`;
    })
    .filter(isDefined);
  location.hash = Arrays.from(new Set([...modes, ...paramsAsToken])).join(",");
};
