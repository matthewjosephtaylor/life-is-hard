import { createState } from "@mjtdev/engine";
import type { MicVAD } from "@ricky0123/vad-web";
import type { ToolConfig } from "ai-worker-common";

export const [useCustomAsrState, updateCustomAsrState, getCustomAsrState] =
  createState({
    /** @deprecated use vad definition instead */
    enabled: false,
    speaking: false,
    vad: undefined as undefined | MicVAD,
    muffled: false,
    micContext: undefined as undefined | AudioContext,
    micSource: undefined as undefined | MediaStreamAudioSourceNode,
    micStream: undefined as undefined | MediaStream,
    toolConfig: undefined as undefined | ToolConfig,
  });
