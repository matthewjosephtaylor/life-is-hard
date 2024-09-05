// evil global state
// TODO make custom TTS state less evil

export type AudioClip = {
  id: string;
  blob: Blob | undefined;
  abort: () => void;
  text: string;
  time: number;
  failed: boolean;
  voiceName?: string;
  // pauseAfter: boolean;
};
