import { getCustomTtsState } from "./getCustomTtsState";

export const waitClipReady = (
  clipId: string,
  maxWaitMs = 30 * 1000
): Promise<Blob | undefined> => {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const resolved = false;
    setTimeout(() => {
      if (resolved) {
        return;
      }
      reject(`max wait on clip: ${clipId}`);
    }, maxWaitMs);
    const check = () => {
      const { audioClips } = getCustomTtsState();
      const clip = audioClips.find((c) => c.id === clipId);
      if (clip && clip.blob) {
        return resolve(clip.blob);
      }
      if (clip && clip.failed) {
        return resolve(undefined);
      }
      requestAnimationFrame(check);
    };
    check();
  });
};
