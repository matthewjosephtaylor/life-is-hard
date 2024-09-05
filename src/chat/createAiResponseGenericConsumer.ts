// import { CloudflareAiChunkResponse, OpenAiTextResponse } from "@mjtdev/engine";
// import { DEFAULT_STOP } from "./DEFAULT_STOP";
// import { decodeAiResponse } from "./decodeAiResponse";
// import { detectStop } from "./detectStop";
// import { detectStopAfter } from "./detectStopAfter";

// export const createAiResponseGenericConsumer =
//   ({
//     stop = DEFAULT_STOP,
//     stopAfter = [],
//     buffer = [],
//     onFinished,
//   }: {
//     stopAfter?: string[];
//     stop: string | string[];
//     buffer?: string[];
//     onFinished: (value: string) => void;
//   }) =>
//   (
//     resp: OpenAiTextResponse | CloudflareAiChunkResponse | undefined,
//     done: boolean
//   ) => {
//     const text = decodeAiResponse(resp);
//     if (text) {
//       buffer.push(text);
//     }
//     const bufferText = buffer.join("");
//     if (done) {
//       onFinished(bufferText);
//     }
//     if (!text) {
//       return;
//     }

//     {
//       const [stoppedTextFragment, stopped] = detectStop(bufferText, stop);
//       if (stopped && stoppedTextFragment) {
//         onFinished(stoppedTextFragment);
//         return true;
//       }
//     }
//     {
//       const [stoppedTextFragment, stopped] = detectStopAfter(
//         bufferText,
//         stopAfter
//       );
//       if (stopped && stoppedTextFragment) {
//         onFinished(stoppedTextFragment);
//         return true;
//       }
//     }
//   };
