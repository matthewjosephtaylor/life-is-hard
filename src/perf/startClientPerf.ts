import { Perfs } from "ai-worker-common";
import { AppEvents } from "../event/AppEvents";

export const startClientPerf = (props: Parameters<typeof Perfs.start>[0]) => {
  return Perfs.start({
    scope: "client",
    onEnd: (data) => {
      AppEvents.dispatchEvent("app:performance", data);
    },
    ...props,
  });
};
