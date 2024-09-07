import { getAppState } from "../state/app/AppState";
import { AppModes } from "../state/location/AppModes";
import { getAppModesAndParams } from "../state/location/getAppModesAndParams";
import { type WINDOWS } from "./WINDOWS";

export const switchWindow = (key: keyof typeof WINDOWS) => {
  const { agreedToTerms } = getAppState();
  if (!agreedToTerms && !getAppModesAndParams().modes.includes("overlay")) {
    return;
  }
  AppModes.upsertHashParam("tab", key);
};
