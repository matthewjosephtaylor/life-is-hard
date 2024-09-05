import { isDefined, waitTimeout } from "@mjtdev/engine";
import type { AiplClientContext } from "./AiplClients";

export const waitForWs = async (
  ctx: AiplClientContext,
  options: Partial<{ maxWaitSeconds: number }> = {}
): Promise<WebSocket | undefined> => {
  const { ws } = ctx.get();

  const { maxWaitSeconds = 10 } = options;

  if (maxWaitSeconds <= 0) {
    throw new Error(`waitForWs: max wait reached, no ws available`);
  }

  if (isDefined(ws)) {
    console.log("websocket ready");
    return ws;
  }
  await waitTimeout(1 * 1000);
  return waitForWs(ctx, { maxWaitSeconds: maxWaitSeconds - 1 });
};
