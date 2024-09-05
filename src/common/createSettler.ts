import { isDefined } from "@mjtdev/engine";

export const createSettler = <T>({
  settleAction,
  settledAfterMs,
}: {
  settledAfterMs: number;
  settleAction: (value: T) => unknown;
}) => {
  let lastValue: T | undefined = undefined;
  let lastModification = Date.now();
  let settling = false;
  const attemptToSettle = () => {
    if (Date.now() > lastModification + settledAfterMs) {
      if (isDefined(lastValue)) {
        settleAction(lastValue);
      }
      settling = false;
      return;
    }
    settling = true;
    setTimeout(attemptToSettle, settledAfterMs);
  };

  return {
    update: (value: T) => {
      lastValue = value;
      lastModification = Date.now();
      if (!settling) {
        attemptToSettle();
      }
    },
  };
};
