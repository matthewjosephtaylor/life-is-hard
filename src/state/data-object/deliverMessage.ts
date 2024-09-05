import { safe } from "@mjtdev/engine";
import type { AppMessage, AppMessageType } from "ai-worker-common";
import { APP_MESSAGE_LISTENERS } from "./APP_MESSAGE_LISTENERS";
import type { AppMessageListener } from "./AppMessageListener";

export const deliverMessage = <T extends AppMessageType>(
  message: AppMessage<T>
) => {
  // @ts-ignore
  // if (typeof message?.detail === "object" && message?.detail["id"]) {
  //   //@ts-ignore
  //   console.log(`deliverMessage: ${message.type} ${message?.detail["id"]}`, [message.detail]);
  // }
  // console.log(`deliverMessage: ${message.type}`, message);
  // AppEvents.dispatchEvent("message", message);
  const listeners: AppMessageListener<T>[] =
    APP_MESSAGE_LISTENERS[message.type];
  if (!listeners) {
    console.warn("no listeners for message", [message.type]);
  }
  for (const listener of listeners) {
    safe(() => listener(message));
  }
};
