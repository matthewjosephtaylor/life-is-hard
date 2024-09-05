import { AppEvents } from "../event/AppEvents";
import { getAsrState, updateAsrState } from "./AsrState";

export const stopAsr = async (): Promise<void> => {
  const { asrActive, speechRecognition } = getAsrState();
  if (!asrActive) {
    return;
  }
  if (!speechRecognition) {
    // AppEvents.dispatchEvent("error", "speech recognition not setup");
    return;
  }
  return new Promise((resolve, reject) => {
    speechRecognition.onend = () => {
      updateAsrState((state) => {
        state.asrActive = false;
      });
      resolve();
      AppEvents.dispatchEvent("ttsStopped");
    };
    speechRecognition.stop();
  });
};
