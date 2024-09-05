import { Apps } from "ai-worker-common";
import { getBackendUser } from "../../backend/user/getBackendUser";
import { storeAppState, updateAppState } from "../app/AppState";
import type { AppMessageListener } from "../data-object/AppMessageListener";
import { getAppModesAndParams } from "../location/getAppModesAndParams";
import { disconnectWs } from "../ws/disconnectWs";
import { getUserState, storeUserState, updateUserState } from "./UserState";

export const handleAuthMessage: AppMessageListener<"auth"> = async (
  message
) => {
  const { detail: authToken } = message;
  console.log("handleAuthMessage", { message });
  if (typeof authToken !== "string") {
    console.log("handleAuthMessage: authToken is not a string!", authToken);
    return Apps.error(new Error("Non-string authToken received"));
  }
  if (getUserState().authToken === authToken) {
    console.log("handleAuthMessage: authToken equals, refusing", authToken);
    return;
  }
  console.log("handleAuthMessage: updating user state", authToken);
  updateUserState((s) => {
    s.authToken = authToken;
  });

  try {
    const user = await getBackendUser();
    // updateAppState((state) => {
    //   state.userId = user?.id;
    // });
    updateUserState((s) => {
      s.authToken = authToken;
      s.id = user?.id;
    });
    if (getAppModesAndParams().modes.includes("pap")) {
      return;
    }
    await storeUserState();
    // await storeAppState();
  } catch (error) {
    console.error(error);
  }
  disconnectWs();
  location.reload();
};
