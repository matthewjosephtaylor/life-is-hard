import { createState } from "@mjtdev/engine";
import type { AsrUtterance } from "./speechRecognitionResultsToTranscript";

export type AsrSession = {
  id: string;
  utterances: AsrUtterance[];
};

export const [useAsrState, updateAsrState, getAsrState] = createState({
  sessions: [] as AsrSession[],
  currentSession: undefined as string | undefined,
  speechRecognition: undefined as SpeechRecognition | undefined,
  asrActive: false,
  asrMuffled: false,
});
