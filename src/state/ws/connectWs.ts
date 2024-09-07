import { Apps } from "ai-worker-common";
import { waitTimeout } from "../../common/waitTimeout";
import { AppEvents } from "../../event/AppEvents";
import { updateServiceStatus } from "../../ui/status/ServiceStatus";
import { getAppState, updateAppState } from "../app/AppState";
import { SwrCaches } from "../data-object/SwrCaches";
import { AppMessagesState } from "./AppMessagesState";
import { sendWsAuth } from "./sendWsAuth";
import { setupWsOnMessage } from "./setupWsOnMessage";

export const connectWs = async (
  params: Partial<{
    baseUrl: string;
    path: string;
    sessionId: string;
    maxRetries: number;
    retryBackoffMs: number;
    appInterfaceId: string;
  }> = {}
): Promise<WebSocket | undefined> => {
  const {
    baseUrl = getAppState().aiBaseUrl,
    appInterfaceId = getAppState().appInterfaceId,
    path = "/ws",
    maxRetries = 10,
  } = params;
  let { retryBackoffMs = 1000 } = params;
  console.log(`connectWs baseUrl: ${baseUrl}`);

  updateServiceStatus((s) => {
    s.services.ws = "busy";
  });

  if (maxRetries <= 0) {
    Apps.error("max retries reached attempting to connect websocket");
    AppEvents.dispatchEvent(
      "error",
      "Problem connecting websocket to remote host. Try refreshing browser?"
    );
    return undefined;
  }

  for (let i = 0; i < maxRetries; i++) {
    const attempt = await new Promise<WebSocket | undefined>(
      (resolve, reject) => {
        try {
          const wsUrl = `${baseUrl?.replace(/^http/, "ws")}${path}`;
          const connectingWs = new WebSocket(wsUrl);
          connectingWs.binaryType = "arraybuffer";
          let resolved = false;
          let messageHandler: undefined | ReturnType<typeof setupWsOnMessage> =
            undefined;

          connectingWs.onclose = () => {
            console.log(`ws: close ${appInterfaceId}`);
            updateServiceStatus((s) => {
              s.services.ws = "error";
            });
            resolve(undefined);
          };
          connectingWs.onerror = (evt) => {
            console.log(`ws: error ${appInterfaceId}`);
            updateServiceStatus((s) => {
              s.services.ws = "error";
            });
            if (messageHandler) {
              connectingWs.removeEventListener("message", messageHandler);
            }
            resolve(undefined);
          };
          connectingWs.onopen = async () => {
            console.log(`ws: open ${appInterfaceId}`);
            updateAppState((state) => {
              state.ws = connectingWs;
            });

            AppMessagesState.dispatch({
              type: "appInterface:ready",
              detail: undefined,
            });

            // setupDataObjectSubs();
            resolved = true;
            messageHandler = setupWsOnMessage(connectingWs);
            await sendWsAuth();

            AppMessagesState.dispatch({
              type: "appInterface:update",
              detail: {
                ttsEnabled: getAppState().ttsEnabled,
              },
            });
            SwrCaches.invalidateEntireSwrCache();

            // AppMessagesState.dispatch({
            //   type: "dataObject:query:setKeys",
            //   detail: SwrCaches.getKeys(),
            //   // type: "app:invalidateCaches",
            //   // detail: undefined,
            // });

            resolve(connectingWs);
          };
        } catch (err) {
          updateServiceStatus((s) => {
            s.services.ws = "error";
          });
          reject(err);
        }
      }
    );
    if (attempt) {
      updateAppState((state) => {
        state.ws = attempt;
        state.wsReady = true;
      });
      updateServiceStatus((s) => {
        s.services.ws = "ready";
      });
      attempt.addEventListener("close", () => {
        console.log("attempting reconnect of closed websocket");
        connectWs(params);
      });
      return attempt;
    }

    console.log(
      `retrying connection, maxRetries: ${maxRetries} backoff: ${retryBackoffMs}`
    );
    await waitTimeout(retryBackoffMs);
    retryBackoffMs += 1000;
  }

  return undefined;
};
