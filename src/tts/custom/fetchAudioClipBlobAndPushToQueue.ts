import { AppEvents } from "../../event/AppEvents";
import { fetchTtsAudio } from "../fetchTtsAudio";
import { updateCustomTtsState } from "./getCustomTtsState";

export const fetchAudioClipBlobAndPushToQueue = async ({
  clipId,
  line,
  voiceName,
  signal,
}: {
  line: string;
  voiceName: string;
  clipId: string;
  signal: AbortSignal;
}) => {
  try {
    const response = await fetchTtsAudio({ text: line, voiceName, signal });
    if (!response || !response.ok) {
      return updateCustomTtsState((state) => {
        const c = state.audioClips.find((c) => c.id === clipId);
        if (!c) {
          return;
        }
        c.failed = true;
      });
    }
    const blob = await response.blob();
    updateCustomTtsState((state) => {
      const c = state.audioClips.find((c) => c.id === clipId);
      if (!c) {
        return;
      }
      c.blob = blob;
    });
    AppEvents.dispatchEvent("ttsBlobReady", clipId);
  } catch (error) {
    console.log(error);
    updateCustomTtsState((state) => {
      const c = state.audioClips.find((c) => c.id === clipId);
      if (!c) {
        return;
      }
      c.failed = true;
    });
  }
};
