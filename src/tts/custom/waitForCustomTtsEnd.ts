import { getTtsState } from "../TtsState";
import type { AudioClip } from "../../audio/AudioClip";
import { useCustomTtsState } from "./getCustomTtsState";

export const waitForCustomTtsEnd = async (
  filter: (audioClip: AudioClip) => boolean = () => true,
  maxTimeMs: number = 30 * 1000
): Promise<boolean> => {
  if (!getTtsState().currentSource) {
    return true;
  }
  return new Promise((resolve, reject) => {
    const unsub = useCustomTtsState.subscribe((s) => {
      const { currentSource } = getTtsState();
      if (s.audioClips.filter(filter).length === 0 && !currentSource) {
        unsub();
        return resolve(true);
      }
    });
    setTimeout(() => {
      unsub();
      return reject(new Error("timed out waiting for custom TTS end"));
    }, maxTimeMs);
  });
};
