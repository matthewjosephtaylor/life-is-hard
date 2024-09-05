import { createState } from "@mjtdev/engine";

export type AiplClientState = Partial<{
  homebaseUrl: string;
  ws: WebSocket;
  sessionId: string;
  appInterfaceId: string;
  authToken: string;

  connectionPath: string;
  maxRetries: number;
  retryBackoffMs: number;
  connecting: boolean;
}>;
