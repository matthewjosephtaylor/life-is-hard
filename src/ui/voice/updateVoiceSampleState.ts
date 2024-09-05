import { createState } from "@mjtdev/engine";


export const [
  useVoiceSampleState, updateVoiceSampleState, getVoiceSampleState,
] = createState({
  pushed: [] as string[],
  voiceIdToUmBlobs: {} as Record<string, Blob[]>,
});
