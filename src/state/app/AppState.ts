import type { Idb } from "@mjtdev/engine";
import { Idbs, createState, isUndefined } from "@mjtdev/engine";
import { loadUserState } from "../user/UserState";
import { AppModes } from "../location/AppModes";

export const DEFAULT_APP_STATE = {
  version: "14", // bump this to delete old state
  localDirectory: undefined as FileSystemDirectoryHandle | undefined,
  agreedToTerms: false,
  // aiBaseUrl: "http://gamepc.local:5000",
  // aiBaseUrl: "http://localhost:8787",
  // aiBaseUrl: "https://ai-worker.mjtdev.workers.dev",
  // "https://ai-worker.mjtdev.workers.dev",
  aiBaseUrl: undefined as string | undefined,
  // userId: undefined as string | undefined,
  rolePlayAsCharacterId: undefined as string | undefined,
  // chatId: undefined as string | undefined,
  ttsEnabled: false,
  maxTokens: 1024,
  ws: undefined as WebSocket | undefined,
  sessionId: undefined as string | undefined,
  wsReady: false,
  lastPhoneNumber: undefined as string | undefined,
  appInterfaceId: undefined as undefined | string,
  gisClientId: undefined as undefined | string,
  appearance: "dark" as "inherit" | "light" | "dark",
};

export const createAppState = () => {
  // NOTE THIS IS LOADED FROM BROWSER AND CHANGES HERE WILL NOT TAKE EFFECT!
  return DEFAULT_APP_STATE;
};

export const [useAppState, updateAppState, getAppState] = createState(
  createAppState()
);

export type AppState = ReturnType<typeof getAppState>;

export const AppDB: Idb<AppState> = {
  dbName: "ai-thing",
  storeName: "app",
};

export const storeAppState = (key = "state") => {
  if (AppModes.getAppModesAndParams().modes.includes("pap")) {
    console.log("refusing to store app state in pap mode");
    return;
  }
  const { ws, ttsEnabled, appInterfaceId, ...rest } = getAppState();
  return Idbs.put(AppDB, key, rest);
};

export const loadAppState = async (key = "state") => {
  if (AppModes.getAppModesAndParams().modes.includes("pap")) {
    updateAppState(() => DEFAULT_APP_STATE);
    console.log("refusing to load app state in pap mode");
    return;
  }
  const appState = await Idbs.get(AppDB, key, () => createAppState());
  if (isUndefined(appState)) {
    console.log("No App State found");
    return;
  }
  if (appState.version !== DEFAULT_APP_STATE.version) {
    console.log("outdated app state schema, recreating");
    await Idbs.remove(AppDB, key);
    updateAppState(() => DEFAULT_APP_STATE);
    await storeAppState();
    return;
  }
  // const { userId } = appState;
  // if (userId) {
  //   await loadUserState(userId);
  // }
  await loadUserState();

  return updateAppState(() => appState);
};
