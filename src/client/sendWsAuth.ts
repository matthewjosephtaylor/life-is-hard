import { waitTimeout } from "@mjtdev/engine";
import { type AppMessage, AppMessages } from "ai-worker-common";
import type { AiplClientContext } from "./AiplClients";
import { log } from "./log";

export const sendWsAuth = async (
  ctx: AiplClientContext,
  authToken: string | undefined
) => {
  const { ws } = ctx.get();
  if (!authToken) {
    log("sendWsAuth: refusing, no authToken");
    return;
  }
  if (!ws) {
    log("sendWsAuth: refusing, no ws");
    return;
  }
  const authMessage: AppMessage<"auth"> = {
    type: "auth",
    detail: authToken,
  };
  AppMessages.dispatch(ws, authMessage);
  await waitTimeout(1 * 1000);
};
