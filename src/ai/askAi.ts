// import { OpenAiCompletionsRequest } from "@mjtdev/engine";
// import { DEFAULT_STOP } from "../chat/DEFAULT_STOP";
// import { createAiResponseGenericConsumer } from "../chat/createAiResponseGenericConsumer";
// import { waitFor } from "../ui/common/waitFor";
// import { askRestfulAiCompletionsStream } from "./askRestfulAiCompletionsStream";

// export const askAi = async (
//   completionsRequest: Partial<{
//     stopAfter: string[];
//     stop: string | string[];
//     signal: AbortSignal;
//     abortController: AbortController;
//   }> &
//     Partial<OpenAiCompletionsRequest> = {}
// ): Promise<string> => {
//   const {
//     stopAfter,
//     stop = DEFAULT_STOP,
//     signal,
//     abortController,
//     ...rest
//   } = completionsRequest;
//   return waitFor(
//     () =>
//       new Promise(async (resolve, reject) => {
//         const resp = await askRestfulAiCompletionsStream({
//           consumer: createAiResponseGenericConsumer({
//             stop,
//             stopAfter,
//             onFinished: (value) => {
//               console.log("askQuestionOfChat onFinished", { value });
//               if (abortController) {
//                 console.log("ABORTING on FINISHED!!!");
//                 abortController.abort();
//               }
//               resolve(value);
//             },
//           }),
//           onDone: () => {
//             console.log("askQuestionOfChat onDone");
//             if (abortController) {
//               console.log("ABORTING on DONE!!!");
//               abortController.abort();
//             }
//           },
//           completionsRequest: rest,
//           signal,
//         });
//         if (!resp || !resp.ok) {
//           console.log(resp);
//           reject(new Error("Error reading from AI Completions stream"));
//         }
//       }),
//     { message: "Asking AI..." }
//   );
// };
