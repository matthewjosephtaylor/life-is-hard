import { connectWs } from "./connectWs";
import { getAppState } from "../app/AppState";
import { waitTimeout } from "@mjtdev/engine";

export const waitForWs = async (): Promise<WebSocket | undefined> => {
  const { ws, wsReady } = getAppState();

  if (ws && wsReady) {
    return ws;
  }
  if (ws && !wsReady) {
    console.log("websocket not ready waiting...");
    await waitTimeout(1 * 1000);
    return waitForWs();
  }
  return connectWs();
};
