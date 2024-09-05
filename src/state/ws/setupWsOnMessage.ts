import type { AppMessage } from "ai-worker-common";
import { Apps } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { Bytes } from "@mjtdev/engine";

export const setupWsOnMessage = (ws: WebSocket) => {
  const handler = (evt: WebSocketEventMap["message"]) => {
    const { data } = evt;
    // console.log("ws message data", data);
    // if (typeof data !== "string") {
    //   Apps.error(
    //     `setupWsOnMessage: unexpected ws message type: ${typeof data}`
    //   );
    //   return;
    // }
    // const message = JSON.parse(data) as AppMessage;

    if (data instanceof ArrayBuffer) {
      // Apps.error(
      //   `setupWsOnMessage: unexpected ws message type: ${typeof data}`
      // );
      // const message = JSON.parse(data) as AppMessage;
      const message = Bytes.msgPackToObject<AppMessage>(new Uint8Array(data));
      AppEvents.dispatchEvent("message", message);
      return;
    } else {
      console.warn("unexpected ws message data", data);
    }
    // const message = JSON.parse(data) as AppMessage;
    // AppEvents.dispatchEvent("message", message);
  };
  ws.addEventListener("message", handler);
  return handler;
};
