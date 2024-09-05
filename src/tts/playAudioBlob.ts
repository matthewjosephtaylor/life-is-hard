// import { Asserts, Bytes, isUndefined } from "@mjtdev/engine";
// import { AppEvents } from "../event/AppEvents";
// import { updateTtsState } from "./TtsState";
// import { audioPlayer } from "./custom/AudioClipPlayer";

// export const playAudioBlob = (blob: Blob, text: string): Promise<boolean> => {
//   Asserts.assertValue(text);
//   // const { audioContext } = getTtsState();

//   const audioContext = audioPlayer.getAudioContext();
//   if (isUndefined(audioContext)) {
//     AppEvents.dispatchEvent(
//       "toast",
//       "playAudioBlob: refusing, no audioContext"
//     );
//     return Promise.resolve(false);
//   }

//   // eslint-disable-next-line no-async-promise-executor
//   return new Promise(async (resolve, reject) => {
//     if (!blob) {
//       return reject("refusing to play undefined blob");
//     }
//     // Fetch the Blob as an ArrayBuffer
//     try {
//       const ab = await Bytes.toArrayBuffer(blob);
//       AppEvents.dispatchEvent(
//         "toast",
//         `playAudioBlob: playing ab length: ${ab.byteLength}`
//       );
//       // const buffer = await audioContext.decodeAudioData(arrayBuffer);
//       const buffer = await audioContext.decodeAudioData(ab);
//       AppEvents.dispatchEvent(
//         "toast",
//         `playAudioBlob: playing ab length: ${ab.byteLength}`
//       );
//       // Create an audio buffer source node
//       // await waitForCustomTtsEnd();
//       updateTtsState((state) => {
//         state.currentSource = audioContext.createBufferSource();
//         state.currentText = text;

//         // Set the buffer to the decoded audio data
//         state.currentSource.buffer = buffer;

//         // Connect the source to the audio context's destination (i.e., speakers)
//         state.currentSource.connect(audioContext.destination);
//         state.currentSource.addEventListener("ended", () => {
//           updateTtsState((s) => {
//             s.currentSource = undefined;
//             s.lastText = s.currentText;
//             s.currentText = undefined;
//           });
//           resolve(true);
//         });
//         // Start playing the audio
//         state.currentSource.start();
//       });
//     } catch (error) {
//       AppEvents.dispatchEvent("error", error);
//       console.log(blob);
//       const text = await blob.text();
//       console.log(text);
//       reject(false);
//     }
//   });
// };
