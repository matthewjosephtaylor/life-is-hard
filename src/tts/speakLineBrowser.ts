import { isEmpty } from "@mjtdev/engine";
import type { BrowserVoiceConfig } from "ai-worker-common";
import { muffleAsr } from "../asr-webkit/muffleAsr";
import { waitFor } from "../ui/common/waitFor";
import { getTtsState, updateTtsState } from "./TtsState";
import { waitForTtsUtteranceEnd } from "./waitForTtsUtteranceEnd";

export const speakLinesBrowser = async (
  lines: string[],
  config: Partial<BrowserVoiceConfig> = {}
) => {
  for (const line of lines) {
    if (!(await speakLineBrowser(line, config))) {
      return;
    }
  }
};

export const speakLineBrowser = async (
  line: string,
  config: Partial<BrowserVoiceConfig>
) => {
  if (isEmpty(line)) {
    return;
  }
  // TODO interruptions for browser?
  // const { interrupted } = getTtsState();
  // if (interrupted) {
  //   updateTtsState((state) => {
  //     state.interrupted = false;
  //   });
  //   return false;
  // }
  // console.log(`line: ${line}, ${interrupted}`);
  if (line.length > 254) {
    const chunks = chunkString(line, 254);
    for (const chunk of chunks) {
      await speakLineBrowser(chunk, config);
    }
    return true;
  }
  const { voices } = getTtsState();
  const { voiceName, pitch, rate } = config;
  await waitForTtsUtteranceEnd();
  await muffleAsr();
  const utterance = new SpeechSynthesisUtterance(line);
  if (pitch && rate && voiceName) {
    utterance.pitch = pitch;
    utterance.rate = rate;
  }
  const voice = voices.find((v) => v.name === voiceName);
  if (voice) {
    utterance.voice = voice;
  }
  return waitFor(
    () =>
      new Promise(async (resolve, reject) => {
        utterance.addEventListener("end", () => {
          updateTtsState((state) => {
            // TODO Browser speaking detection
            // state.speaking = false;
            state.currentUtterance = undefined;
          });
          resolve(true);
        });
        utterance.addEventListener("error", (evt) => {
          console.log("speech error");
          console.log({ evt });
          updateTtsState((state) => {
            // TODO Browser speaking detection
            // state.speaking = false;
            state.currentUtterance = undefined;
          });
          reject(evt);
        });
        updateTtsState((state) => {
          // TODO Browser speaking detection
          // state.speaking = true;
          state.currentUtterance = utterance;
        });
        // Asserts.assert(!speechSynthesis.speaking);
        // Asserts.assert(getAsrState().asrMuffled);
        await muffleAsr();
        speechSynthesis.speak(utterance);
      }),
    { message: `speaking` }
  );
};
