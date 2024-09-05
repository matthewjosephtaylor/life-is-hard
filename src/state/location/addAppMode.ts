import type { AppMode } from "./AppLocationState";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";
import { setLocationFromModesAndHashParams } from "./removeHashParam";

export const addAppMode = (mode: AppMode) => {
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  // const paramsAsToken = Objects.entries(hashParams).map(
  //   ([key, value]) => `${HASH_PARAM_PREFIX}${keyValueToHashToken(key, value)}`
  // );

  setLocationFromModesAndHashParams({
    modes: [...modes, mode],
    hashParams,
  });

  // location.hash = Arrays.from(new Set([...modes, ...paramsAsToken, mode])).join(
  //   ","
  // );
};
