// import type { Ticker } from "@mjtdev/engine";
// import { Animates } from "@mjtdev/engine";
// import { orError } from "../../common/orError";
// import { playAudioBlob } from "../playAudioBlob";
// import { getCustomTtsState, updateCustomTtsState } from "./getCustomTtsState";
// import { waitClipReady } from "./waitClipReady";

// export const drainTtsTicker: Ticker = async () => {
//   const { audioClips } = getCustomTtsState();
//   if (audioClips.length === 0) {
//     return;
//   }
//   const clip = audioClips[0];
//   if (!clip) {
//     return;
//   }
//   const blobOrError = await orError(() => waitClipReady(clip.id));

//   // clean up failures
//   if (blobOrError instanceof Error || !blobOrError) {
//     updateCustomTtsState((state) => {
//       state.audioClips = state.audioClips.filter((c) => c.id !== clip.id);
//     });
//   }

//   // play blob
//   if (blobOrError instanceof Blob) {
//     try {
//       await playAudioBlob(blobOrError, clip.text);
//     } catch (error) {
//       console.log("Error playing audio blob", blobOrError);
//     } finally {
//       updateCustomTtsState((state) => {
//         state.audioClips = state.audioClips.filter((c) => c.id !== clip.id);
//       });
//     }
//   }
// };

// export const startTtsBlobQueueDrainer = async (signal: AbortSignal) => {
//   Animates.create({ signal, ticker: drainTtsTicker });
// };
