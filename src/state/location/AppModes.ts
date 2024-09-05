import { addAppMode } from "./addAppMode";
import { getAppModesAndParams } from "./getAppModesAndParams";
import { removeAppMode } from "./removeAppMode";
import { removeHashParam } from "./removeHashParam";
import { upsertHashParam } from "./upsertHashParam";
import { useAppHashParam } from "./useAppHashParam";
import { getAppHashParam } from "./getAppHashParam";
import { useAppModesAndParams } from "./useAppModesAndParams";

export const AppModes = {
  addAppMode,
  removeAppMode,

  removeHashParam,
  upsertHashParam,

  useAppModesAndParams,
  getAppModesAndParams,

  useAppHashParam,
  getAppHashParam,
};
