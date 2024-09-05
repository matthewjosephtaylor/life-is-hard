import { closeAudioStreamAndContext } from "../ui/chat/entry/closeAudioStreamAndContext";
import {
  updateCustomAsrState,
  getCustomAsrState,
} from "./updateCustomAsrState";

export function clearStream(stream: MediaStream) {
  // if (!stream) return;
  // if (stream.stop) {
  //   stream.stop();
  // }
  // const tracks = stream.getTracks();
  // tracks.forEach((track) => {
  //   track.stop();
  //   stream.removeTrack(track);
  // });
}

export const stopVadAsr = async () => {
  const { vad, micContext, micStream } = getCustomAsrState();
  console.log("stopVadAsr: destroying vad");
  vad?.destroy();

  await closeAudioStreamAndContext({
    audioContext: micContext,
    stream: micStream,
  });
  // vad.pause();
  updateCustomAsrState((s) => {
    s.vad = undefined;
    s.enabled = false;
    s.micContext = undefined;
    s.micSource = undefined;
    s.micStream = undefined;
  });
};
