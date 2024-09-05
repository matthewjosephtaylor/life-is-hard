import { resumeAudioContext } from "./resumeAudioContext";

export const requestSpeakerAccess = async (): Promise<
  AudioContext | undefined
> => {
  const audioContext: AudioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
  await resumeAudioContext(audioContext);
  return audioContext;
};
