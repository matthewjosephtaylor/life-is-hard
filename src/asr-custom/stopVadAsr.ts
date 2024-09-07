import { closeAudioStreamAndContext } from "../ui/chat/entry/closeAudioStreamAndContext";
import {
  getCustomAsrState,
  updateCustomAsrState,
} from "./updateCustomAsrState";

export const stopVadAsr = async () => {
  const { vad, micContext, micStream } = getCustomAsrState();
  vad?.destroy();

  await closeAudioStreamAndContext({
    audioContext: micContext,
    stream: micStream,
  });
  updateCustomAsrState((s) => {
    s.vad = undefined;
    s.enabled = false;
    s.micContext = undefined;
    s.micSource = undefined;
    s.micStream = undefined;
  });
};
