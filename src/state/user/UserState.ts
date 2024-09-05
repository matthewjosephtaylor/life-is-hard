import type { Idb } from "@mjtdev/engine";
import { Idbs, createState } from "@mjtdev/engine";
import type { AppUser } from "ai-worker-common";
import { AppModes } from "../location/AppModes";

export type LocalStoredUser = AppUser & {
  authToken: string | undefined;
};

export const UserDB: Idb<LocalStoredUser> = {
  dbName: "ai-thing",
  storeName: "user",
};

// Partial<LocalStoredUser>
export const [useUserState, updateUserState, getUserState] = createState({
  id: undefined as string | undefined,
  authToken: undefined as string | undefined,
});

export const storeUserState = (key = "state") => {
  if (AppModes.getAppModesAndParams().modes.includes("pap")) {
    console.log("refusing to store user state in pap mode");
    return;
  }
  const user = getUserState();
  if (!user.id) {
    return;
  }
  // return Idbs.put(UserDB, user.id, user);
  return Idbs.put(UserDB, key, user);
};

export const removeUserState = (key = "state") => {
  return Idbs.remove(UserDB, key);
  // const user = getUserState();
  // if (!user.id) {
  //   return;
  // }
  // // return Idbs.remove(UserDB, user.id);
  // return Idbs.remove(UserDB, key);
};

export const loadUserState = async (key = "state") => {
  if (AppModes.getAppModesAndParams().modes.includes("pap")) {
    console.log("refusing to load user state in pap mode");
    return;
  }

  const user = await Idbs.get(UserDB, key);
  if (!user) {
    return;
  }
  updateUserState(() => user);
};
