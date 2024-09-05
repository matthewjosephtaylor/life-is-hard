// import type {
//   OpenAiCompletionsRequest,
//   OpenAiTextResponse} from "@mjtdev/engine";
// import {
//   CLOUDFLARE_AI_DONE_CHUNK,
//   Parsers,
//   Reacts,
//   lock,
//   safe,
// } from "@mjtdev/engine";
// import { Fetches } from "ai-worker-common";
// import { getAiPathPrefix } from "../common/getAiPathPrefix";
// import { AppEvents } from "../event/AppEvents";
// import { getHomeAuth } from "../state/getHomeAuth";
// import { AI_LOCK } from "./AI_LOCK";
// import { getActiveProfileModel } from "./getActiveProfileModel";

// export const askRestfulAiCompletionsStream = async ({
//   consumer,
//   completionsRequest = {},
//   signal,
//   onDone = () => {},
// }: {
//   signal?: AbortSignal;
//   onDone?: () => void;
//   consumer: (
//     value: OpenAiTextResponse | undefined,
//     done: boolean
//   ) => boolean | undefined | void;
//   completionsRequest?: Partial<OpenAiCompletionsRequest>;
// }): Promise<Response | undefined> => {
//   const model = getActiveProfileModel("textgen");
//   const data: Partial<OpenAiCompletionsRequest> = {
//     ...completionsRequest,
//     stream: true,
//     model: model,
//   };
//   console.log("askRestfulAiCompletionsStream abortSignal", { signal });

//   // const pathPrefix = getAiPathPrefix();
//   const { authToken, homeBaseUrl } = getHomeAuth();

//   // const postfix = homeBaseUrl?.includes("completions") ? "" : "/v1/completions";
//   // const url = `${homeBaseUrl}${postfix}`;

//   const response = await lock(
//     () =>
//       Fetches.fetchWithJson({
//         url: `${homeBaseUrl}/v1/completions`,
//         data,
//         authToken,
//         options: {
//           signal,
//           headers: {
//             "X-SERVICE": "textgen",
//           },
//         },
//       }),
//     {
//       name: AI_LOCK,
//     }
//   );
//   if (!response.ok) {
//     const text = await response.text();
//     Reacts.dispatchCustomEvent(
//       "error",
//       `Error fetching AI: ${response.statusText}: ${response.statusText}: ${text}`
//     );
//     consumer(undefined, true);
//     return response;
//   }
//   const stream = new TextDecoderStream();
//   if (!response.body) {
//     Reacts.dispatchCustomEvent(
//       "error",
//       `Error asking AI (no body): ${response.statusText}: ${response.statusText}`
//     );
//     return response;
//   }
//   const pipe = response.body.pipeThrough(stream);
//   const reader = pipe.getReader();

//   const abortListenerDisposer = AppEvents.addEventListener(
//     "abort-generation",
//     () => {
//       safe(() => reader.cancel());
//       abortListenerDisposer();
//     }
//   );

//   const buffer: string[] = [];
//   const dataParser = (data: string) => {
//     if (!data) {
//       return;
//     }
//     if (data === CLOUDFLARE_AI_DONE_CHUNK) {
//       return true;
//     }
//     buffer.push(data);
//     const parsed = safe(() => JSON.parse(buffer.join("")));
//     if (!parsed) {
//       return;
//     }
//     buffer.length = 0;
//     return parsed;
//   };

//   // TODO SSE parser/reader really wants abort signal
//   Parsers.createSseParser({
//     consumer,
//     reader,
//     onDone: () => {
//       console.log("askRestfulAiCompletionsStream onDone")
//       reader.cancel();
//       onDone();
//       abortListenerDisposer();
//     },
//     dataParser,
//   });
//   return response;
// };
