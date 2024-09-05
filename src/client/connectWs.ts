import { waitTimeout } from "@mjtdev/engine";
import { EVENTS } from "./AiplClientEvents";
import { AiplClientMessages } from "./AiplClientMessages";
import type { AiplClientContext } from "./AiplClients";
import { sendWsAuth } from "./sendWsAuth";
import { setupWsOnMessage } from "./setupWsOnMessage";
import { log } from "./log";
export const connectWs = async (ctx: AiplClientContext): Promise<void> => {
  const state = ctx.get();
  const {
    homebaseUrl: baseUrl,
    appInterfaceId,
    connectionPath: path = "/ws",
    maxRetries = 10,
    connecting,
  } = state;
  let { retryBackoffMs = 5000 } = state;
  log(`connectWs baseUrl: ${baseUrl}`);

  if (connecting) {
    return;
  }

  if (maxRetries <= 0) {
    log("max retries reached attempting to connect websocket");
    EVENTS.emit(
      "error",
      "Problem connecting websocket to remote host. Try refreshing browser?"
    );
    return undefined;
  }

  ctx.update((s) => {
    s.connecting = true;
  });

  for (let i = 0; i < maxRetries; i++) {
    log(`connectWs: attempt: ${i} with backoff: ${retryBackoffMs}`);
    const attempt = await new Promise<WebSocket | undefined>(
      (resolve, reject) => {
        try {
          const wsUrl = `${baseUrl?.replace(/^http/, "ws")}${path}`;
          log(`connecting to: ${wsUrl}`);
          // log(`sessionId: ${sessionId}`);
          // setCookie("sessionId", sessionId);
          const connectingWs = new WebSocket(wsUrl);
          connectingWs.binaryType = "arraybuffer";
          let resolved = false;
          let messageHandler: undefined | ReturnType<typeof setupWsOnMessage> =
            undefined;

          connectingWs.onclose = (evt) => {
            log(`connectWs: close`, evt.code, evt.reason);
            ctx.update((s) => {
              s.connecting = false;
            });
            resolve(undefined);
          };
          connectingWs.onerror = (evt) => {
            log(`connectWs: error`, evt);
            if (messageHandler) {
              connectingWs.removeEventListener("message", messageHandler);
            }
            ctx.update((s) => {
              s.connecting = false;
            });
            resolve(undefined);
          };
          connectingWs.onopen = async (evt) => {
            log(`connectWs: open`, evt.eventPhase);
            ctx.update((state) => {
              state.ws = connectingWs;
              state.connecting = false;
            });

            resolved = true;
            messageHandler = setupWsOnMessage(connectingWs);
            if (ctx.get().authToken) {
              await sendWsAuth(ctx, ctx.get().authToken);
            }

            AiplClientMessages.dispatch(ctx, {
              type: "appInterface:ready",
              detail: undefined,
            });
            resolve(connectingWs);
          };
        } catch (err) {
          reject(err);
        }
      }
    );
    if (attempt) {
      ctx.update((state) => {
        state.ws = attempt;
      });
      attempt.addEventListener("close", () => {
        log("attempting reconnect of closed websocket");
        connectWs(ctx);
      });
      return;
    }

    log(
      `retrying connection, maxRetries: ${maxRetries} backoff: ${retryBackoffMs}`
    );
    await waitTimeout(retryBackoffMs);
    retryBackoffMs += 1000;
  }

  return undefined;
};
