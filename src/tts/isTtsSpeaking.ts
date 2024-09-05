import { isDefined } from "@mjtdev/engine";
import { getTtsState } from "./TtsState";

export const isTtsSpeaking = () => {
  const { currentSource, currentUtterance } = getTtsState();
  return isDefined(currentSource || currentUtterance);
};


