import { AppMessagesState } from "../ws/AppMessagesState";

export const signalToAbortHandler = (signal: AbortSignal | undefined) => {
  if (!signal) {
    return;
  }

  const abortId = `abort-${crypto.randomUUID()}`;
  if (signal) {
    signal.addEventListener("abort", () => {
      AppMessagesState.dispatch({
        type: "abort",
        detail: abortId,
      });
    });
  }
  return abortId;
};
