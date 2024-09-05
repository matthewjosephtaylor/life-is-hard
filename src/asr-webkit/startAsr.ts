import { AppEvents } from "../event/AppEvents";
import { getAsrState, updateAsrState } from "./AsrState";

export const startAsr = async (): Promise<void> => {
  const { asrActive: active, speechRecognition } = getAsrState();
  if (!speechRecognition) {
    // AppEvents.dispatchEvent("error", "speech recognition not setup");
    return;
  }
  if (active) {
    return;
  }
  return new Promise((resolve) => {
    speechRecognition.onstart = () => {
      updateAsrState((state) => {
        state.asrActive = true;
      });
      AppEvents.dispatchEvent("asrStarted");
      resolve();
    };
    setTimeout(() => {
      speechRecognition.start();
    }, 500);
  });
};
