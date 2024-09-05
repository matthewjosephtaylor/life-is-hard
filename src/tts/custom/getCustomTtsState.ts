import { createState } from "@mjtdev/engine";
import type { AudioClip } from "../../audio/AudioClip";

export const [useCustomTtsState, updateCustomTtsState, getCustomTtsState] =
  createState({
    audioClips: [] as AudioClip[],
  });
