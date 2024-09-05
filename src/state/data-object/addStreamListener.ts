import { AppEvents } from "../../event/AppEvents";

export const addStreamListener = <T>({
  onData,
  maxWaitMs = 60 * 1000,
  streamId: streamId = `stream-${Date.now()}-${crypto.randomUUID()}`,
  onTimeout = () => {},
  stream = true,
}: {
  onData: (
    data: T
  ) => Promise<void | undefined | boolean> | void | undefined | boolean;
  onTimeout?: () => void;
  maxWaitMs?: number;
  streamId?: string;
  stream?: boolean;
}) => {
  let disposed = false;
  const disposer = AppEvents.addEventListener("stream", async ({ detail }) => {
    const { streamId: remoteStreamId, data } = detail;
    if (remoteStreamId === streamId) {
      const shouldDispose = await onData(data as T);
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
  return streamId;
};
