import { getTtsState } from "./TtsState";

export const waitForTtsUtteranceEnd = async (): Promise<void> => {
  const { currentUtterance } = getTtsState();

  if (!currentUtterance) {
    return;
  }

  return new Promise((resolve, reject) => {
    const listener = async () => {
      currentUtterance.removeEventListener("end", listener);
      currentUtterance.removeEventListener("error", listener);
      resolve();
    };
    currentUtterance.addEventListener("end", listener);
    currentUtterance.addEventListener("error", listener);
  });
};

export const waitForSpeechSynthesisEnd = async (
  maxWaitMs = 10 * 1000
): Promise<void> => {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const waiter = () => {
      if (Date.now() - start > maxWaitMs) {
        return resolve();
      }
      if (!speechSynthesis.speaking) {
        return resolve();
      }
      setTimeout(() => {
        // console.log("waiting for SS to stop speaking");
        waiter();
      }, 16);
    };
    waiter();
  });
};
