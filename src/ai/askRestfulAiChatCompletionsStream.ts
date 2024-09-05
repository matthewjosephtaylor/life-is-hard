// import {
//   OpenAiCompletionsRequest,
//   OpenAiTextResponse,
//   Reacts,
//   lock,
//   safe,
//   Parsers,
//   OpenAiChatCompletionsRequest,
//   OpenAiChatCompletionsChunkResponse,
// } from "@mjtdev/engine";
// import { authTokenToAuthHeader } from "../common/authTokenToAuthHeader";
// import { AppEvents } from "../event/AppEvents";
// import { getAppState } from "../state/AppState";
// import { AI_LOCK } from "./AI_LOCK";
// import { getUserState } from "../user/UserState";
// import { openErrorPopup } from "../ui/common/openErrorPopup";

// export const askRestfulAiChatCompletionsStream = async (
//   consumer: (
//     value: OpenAiChatCompletionsChunkResponse | undefined
//   ) => boolean | undefined | void,
//   params: Partial<OpenAiChatCompletionsRequest> = {}
// ): Promise<void> => {
//   const { aiBaseUrl } = getAppState();
//   const { authToken } = getUserState();
//   if (!authToken) {
//     openErrorPopup("Unable to stream completion request, user not logged in");
//     return;
//   }
//   const data: Partial<OpenAiCompletionsRequest> = {
//     ...params,
//     stream: true,
//   };

//   const headers = authTokenToAuthHeader(authToken);

//   const response = await lock(
//     () =>
//       fetch(`${aiBaseUrl}/v1/completions`, {
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json", ...headers },
//         method: "POST",
//       }),
//     {
//       name: AI_LOCK,
//     }
//   );
//   if (!response.ok) {
//     Reacts.dispatchCustomEvent(
//       "error",
//       `Error asking AI: ${response.statusText}: ${response.statusText}`
//     );
//     consumer(undefined);
//     return;
//   }
//   const stream = new TextDecoderStream();
//   if (!response.body) {
//     Reacts.dispatchCustomEvent(
//       "error",
//       `Error asking AI (no body): ${response.statusText}: ${response.statusText}`
//     );
//     return;
//   }
//   const pipe = response.body.pipeThrough(stream);
//   const reader = pipe.getReader();

//   const abortListenerDisposer = AppEvents.addEventListener(
//     "abort-generation",
//     () => {
//       safe(() => reader.cancel());
//       abortListenerDisposer();
//     }
//   )

//   return Parsers.createSseParser({
//     consumer,
//     reader,
//     onDone: () => {
//       AppEvents.dispatchEvent("finished-generation");
//       abortListenerDisposer();
//     },
//   });
// };
