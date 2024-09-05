import { EVENTS } from "./AiplClientEvents";

export const addReturnListener = <T>({
  onReturn,
  maxWaitMs = 60 * 1000,
  returnId = `return-${Date.now()}-${crypto.randomUUID()}`,
  onTimeout = () => {},
  stream = false,
}: {
  onReturn: (
    data: T
  ) => Promise<void | undefined | boolean> | void | undefined | boolean;
  onTimeout?: () => void;
  maxWaitMs?: number;
  returnId?: string;
  stream?: boolean;
}) => {
  let disposed = false;
  const disposer = EVENTS.on("return", async (evt) => {
    const { returnId: remoteReturnId, data } = evt.detail;
    if (remoteReturnId === returnId) {
      const shouldDispose = await onReturn(data as T);
      if (stream && !shouldDispose) {
        return;
      }
      disposer();
      disposed = true;
    }
  });
  setTimeout(() => {
    if (disposed) {
      return;
    }

    disposer();
    onTimeout();
  }, maxWaitMs);
  return returnId;
};
