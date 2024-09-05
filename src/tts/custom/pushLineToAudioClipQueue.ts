import type { AudioClip } from "../../audio/AudioClip";
import { fetchAudioClipBlobAndPushToQueue } from "./fetchAudioClipBlobAndPushToQueue";
import { updateCustomTtsState } from "./getCustomTtsState";

export const pushLineToAudioClipQueue = async (
  line: string,
  voiceName: string = "female"
) => {
  const clipId = crypto.randomUUID();

  const abortController = new AbortController();
  updateCustomTtsState((state) => {
    const clip: AudioClip = {
      pauseAfter: true,
      id: clipId,
      text: line,
      blob: undefined,
      failed: false,
      abort: () => {
        abortController.abort();
      },
      time: performance.now(),
      voiceName,
    };

    state.audioClips.push(clip);
  });
  fetchAudioClipBlobAndPushToQueue({
    clipId,
    line,
    voiceName,
    signal: abortController.signal,
  });
};
