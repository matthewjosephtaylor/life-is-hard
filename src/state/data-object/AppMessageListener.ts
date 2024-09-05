import type { AppMessage, AppMessageType } from "ai-worker-common";


export type AppMessageListener<T extends AppMessageType> = (
  message: AppMessage<T>
) => void;
