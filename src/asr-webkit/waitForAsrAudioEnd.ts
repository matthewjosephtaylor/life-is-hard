import { getAsrState } from "./AsrState";

export const waitForAsrAudioEnd = async (): Promise<void> => {
  const { asrActive: active } = getAsrState();
  if (!active) {
    return;
  }
  return new Promise((resolve) => {
    const { speechRecognition } = getAsrState();
    if (!speechRecognition) {
      return resolve();
    }
    const audioEndListener = () => {
      speechRecognition.removeEventListener("audioend", audioEndListener);
      return resolve();
    };
    speechRecognition.addEventListener("audioend", audioEndListener);
  });
};
