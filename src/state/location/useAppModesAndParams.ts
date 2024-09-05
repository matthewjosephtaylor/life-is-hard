import type { AppLocationState } from "./AppLocationState";
import { getLocationModesAndAppParams } from "./getLocationModesAndAppParams";
import { useLocation } from "./useLocation";

export const useAppModesAndParams = (): AppLocationState => {
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const { modes, hashParams } = getLocationModesAndAppParams(location);
  return { modes, params, hashParams };
};
