import { Arrays, Objects } from "@mjtdev/engine";
import type { AppMode } from "./AppLocationState";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";
import { HASH_PARAM_PREFIX } from "./HASH_PARAM_PREFIX";
import { setLocationFromModesAndHashParams } from "./removeHashParam";

export const removeAppMode = (mode: AppMode) => {
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  const modeSet = new Set(modes);
  modeSet.delete(mode);

  setLocationFromModesAndHashParams({
    modes: Arrays.from(modeSet),
    hashParams,
  });

  // location.hash = Arrays.from(modeSet).join(",");
};
