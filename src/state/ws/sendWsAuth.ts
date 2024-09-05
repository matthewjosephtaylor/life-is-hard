import type { AppMessage } from "ai-worker-common";
import { AppMessages } from "ai-worker-common";
import { getAppState } from "../app/AppState";
import { getUserState } from "../user/UserState";
import { waitTimeout } from "@mjtdev/engine";

export const sendWsAuth = async (
  authToken: string | undefined = getUserState().authToken
) => {
  const { ws } = getAppState();
  if (!authToken) {
    console.log("sendWsAuth: refusing, no authToken");
    return;
  }
  if (!ws) {
    console.log("sendWsAuth: refusing, no ws");
    return;
  }
  const authMessage: AppMessage<"auth"> = {
    type: "auth",
    detail: authToken,
  };
  AppMessages.dispatch(ws, authMessage);
  console.log("TBD get positive from worker that auth was accepted/ws ready");
  await waitTimeout(1 * 1000);
};
