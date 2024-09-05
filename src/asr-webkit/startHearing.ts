import { Asserts } from "@mjtdev/engine";
import { AppEvents } from "../event/AppEvents";
import { isTtsSpeaking } from "../tts/isTtsSpeaking";
import { waitFor } from "../ui/common/waitFor";
import { getAsrState } from "./AsrState";
import { isHearing } from "./isHearing";
import { setupAsr } from "./setupAsr";
import { startAsr } from "./startAsr";

export const startHearing = async (): Promise<void> => {
  setupAsr();
  if (isHearing()) {
    console.log("already hearing...");
    return;
  }
  return waitFor(
    () =>
      new Promise(async (resolve, reject) => {
        console.log("starting Asr...");
        const { speechRecognition } = getAsrState();
        if (!speechRecognition) {
          return resolve();
        }
        Asserts.assert(!isTtsSpeaking());

        AppEvents.once("ttsStopped", () => {
          resolve();
        });
        startAsr();
      }),
    { message: "listening" }
  );
};
