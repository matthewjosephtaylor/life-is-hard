import type { AppMessageMap } from "ai-worker-common";
import { addReturnListener } from "./addReturnListener";
import { AiplClientMessages } from "./AiplClientMessages";
import type { AiplClientContext } from "./AiplClients";

export const call = <T extends keyof AppMessageMap>(
  ctx: AiplClientContext,
  type: T,
  detail: Omit<AppMessageMap[T], "returnId">
): Promise<unknown> => {
  return new Promise<unknown>((resolve, reject) => {
    const returnId = addReturnListener<unknown>({
      onReturn: (data) => {
        resolve(data);
      },
      onTimeout: () => {
        reject(`timeout waiting for response for ${returnId}`);
      },
    });
    AiplClientMessages.dispatch(ctx, {
      type,
      detail: { ...detail, returnId } as AppMessageMap[T],
    });
  });
};
