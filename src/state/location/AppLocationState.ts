import type { APP_LOCATION_MODES } from "./APP_LOCATION_MODES";
import type { AppHashParamKey } from "./AppHashParamKey";

export type AppLocationState = {
  modes: (typeof APP_LOCATION_MODES)[number][];
  params: Record<string, string>;
  hashParams: Record<AppHashParamKey, string>;
};

export type AppMode = AppLocationState["modes"][number];
