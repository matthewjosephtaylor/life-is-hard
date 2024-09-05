import type { AppLocationState } from "./AppLocationState";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";

export const getAppModesAndParams = (): AppLocationState => {
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  return { modes, params, hashParams };
};
