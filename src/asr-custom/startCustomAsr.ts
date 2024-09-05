import { isDefined } from "@mjtdev/engine";
import { startVad } from "./startVad";
import { getCustomAsrState } from "./updateCustomAsrState";

export const startCustomAsr = async () => {
  const { vad, enabled } = getCustomAsrState();
  if (enabled && isDefined(vad)) {
    return;
  }
  return startVad();
  // vad.start();
  // updateCustomAsrState((s) => {
  //   s.enabled = true;
  // });
};
