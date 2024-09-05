import { Arrays, Objects } from "@mjtdev/engine";
import { HASH_PARAM_PREFIX } from "./HASH_PARAM_PREFIX";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";
import { keyValueToHashToken } from "./keyValueToHashToken";
import type { AppHashParamKey } from "./AppHashParamKey";
import { setLocationFromModesAndHashParams } from "./removeHashParam";

export const upsertHashParam = (key: AppHashParamKey, value: string) => {
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  const updated: Record<string, string> = { ...hashParams, [key]: value };
  // const paramsAsToken = Objects.entries(updated).map(
  //   ([key, value]) => `${HASH_PARAM_PREFIX}${keyValueToHashToken(key, value)}`
  // );

  setLocationFromModesAndHashParams({
    modes,
    hashParams: updated,
  });
  // location.hash = Arrays.from(new Set([...modes, ...paramsAsToken])).join(",");
};
