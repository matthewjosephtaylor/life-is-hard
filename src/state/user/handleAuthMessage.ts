import { Apps } from "ai-worker-common";
import { getBackendUser } from "../../backend/user/getBackendUser";
import type { AppMessageListener } from "../data-object/AppMessageListener";
import { getAppModesAndParams } from "../location/getAppModesAndParams";
import { disconnectWs } from "../ws/disconnectWs";
import { getUserState, storeUserState, updateUserState } from "./UserState";

export const handleAuthMessage: AppMessageListener<"auth"> = async (
  message
) => {
  const { detail: authToken } = message;
  if (typeof authToken !== "string") {
    console.error("handleAuthMessage: authToken is not a string!", authToken);
    return Apps.error(new Error("Non-string authToken received"));
  }
  if (getUserState().authToken === authToken) {
    return;
  }
  updateUserState((s) => {
    s.authToken = authToken;
  });

  try {
    const user = await getBackendUser();
    updateUserState((s) => {
      s.authToken = authToken;
      s.id = user?.id;
    });
    if (getAppModesAndParams().modes.includes("pap")) {
      return;
    }
    await storeUserState();
  } catch (error) {
    console.error(error);
  }
  disconnectWs();
  location.reload();
};
