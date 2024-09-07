import type { AppMessageMap } from "ai-worker-common";
import { addReturnListener } from "../data-object/addReturnListener";
import { dispatch } from "./AppMessagesState";

export const call = <T extends keyof AppMessageMap>(
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
    dispatch({
      type,
      detail: { ...detail, returnId } as AppMessageMap[T],
    });
  });
};
