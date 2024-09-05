import { isDefined } from "@mjtdev/engine";
import { useTtsState } from "./TtsState";


export const useIsTtsSpeaking = () => {
  const { currentSource, currentUtterance } = useTtsState();
  return isDefined(currentSource || currentUtterance);
};
