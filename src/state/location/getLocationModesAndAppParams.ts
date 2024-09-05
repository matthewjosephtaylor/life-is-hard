import { Objects, isDefined } from "@mjtdev/engine";
import { findFirstPapId } from "../../ui/overlay/findFirstPapId";
import type { AppHashParamKey } from "./AppHashParamKey";
import type { AppLocationState } from "./AppLocationState";
import { HASH_PARAM_PREFIX } from "./HASH_PARAM_PREFIX";
import { hashTokenToKeyValue } from "./hashTokenToKeyValue";
import type { LocationState } from "./useLocation";

export const getLocationModesAndAppParams = (
  location: LocationState
): {
  modes: AppLocationState["modes"];
  hashParams: Record<AppHashParamKey, string>;
} => {
  const { pathname, hash } = location;
  const hashTokens = hash
    .replace(/^#/, "")
    .split(",")
    .filter((s) => s.length !== 0);
  const hashModes = hashTokens.filter((s) => !s.startsWith(HASH_PARAM_PREFIX));
  const papId = hashTokens.includes("power") ? undefined : findFirstPapId();

  const pathModes = [
    pathname.includes("access-point") || isDefined(papId) ? "pap" : undefined,
  ].filter(isDefined);

  const overlayModes = [
    isDefined(document.querySelector<HTMLDivElement>("div#ai-workforce"))
      ? undefined
      : "overlay",
  ].filter(isDefined);

  const hashParamEntries = hashTokens
    .filter((mode) => mode.startsWith(HASH_PARAM_PREFIX))
    .map((token) => {
      const parts = hashTokenToKeyValue(
        token.replace(new RegExp(`^\\${HASH_PARAM_PREFIX}`), "")
      );
      if (!parts || parts.length !== 2) {
        return undefined;
      }
      return [parts[0], parts[1]] as const;
    })
    .filter(isDefined);
  const hashParams = Objects.fromEntries(hashParamEntries);
  const modes = [
    ...pathModes,
    ...overlayModes,
    ...hashModes,
  ] as AppLocationState["modes"];
  if (!modes.includes("power") && isDefined(__APP_FRONT__)) {
    hashParams.appFront = __APP_FRONT__;
  }
  if (!modes.includes("power") && isDefined(papId)) {
    hashParams.papId = papId;
  }

  return { modes, hashParams };
};
