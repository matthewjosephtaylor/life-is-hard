import { getAppState } from "../state/app/AppState";
import { AppModes } from "../state/location/AppModes";
import { getAppModesAndParams } from "../state/location/getAppModesAndParams";
import { type WINDOWS } from "./WINDOWS";

export const switchWindow = (key: keyof typeof WINDOWS) => {
  console.log(`switching to:${key}`);
  const { agreedToTerms } = getAppState();
  if (!agreedToTerms && !getAppModesAndParams().modes.includes("overlay")) {
    console.log("no agree to terms no siwtch!");
    return;
  }
  AppModes.upsertHashParam("tab", key);
  console.log("Params", AppModes.getAppModesAndParams());

  // updateMainViewportState((s) => {
  //   s.windowKey = key;
  // });
};
