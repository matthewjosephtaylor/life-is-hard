// import { safe } from "@mjtdev/engine";
// import { Chat, ChatMessage, isChatAnswer } from "ai-worker-common";
// import {
//   AppReport,
//   AppReportField,
// } from "ai-worker-common/dist/type/app-report/AppReport";
// import { AppEvents } from "../event/AppEvents";
// import { AppMessagesState } from "../state/ws/AppMessagesState";

// export const fillOutReport = async ({
//   chat,
//   messages,
//   report,
// }: {
//   chat: Chat;
//   messages: ChatMessage[];
//   report: AppReport;
// }): Promise<{ fields: AppReportField[] }> => {
//   const aiPrePrompt = `{"name":"${report.name}", "fields":[{"name":"`;

//   const returnId = `return-report-${crypto.randomUUID()}`;

//   AppMessagesState.dispatch({
//     type: "chat:ask",
//     detail: {
//       chatId: chat.id,
//       returnId,
//       userMessage:
//         "Using the conversation ONLY! Fill out the FORM and answer questions within it",
//       systemMessage: `Next reply MUST be in JSON format. 
//     You MUST use the same JSON property names of 'name' and 'description' for the fields.
//     You MUST answer 'unknown' if the answer is unknown!!!
//     DO NOT MAKE UP ANSWERS TO THE REPORT!!!!

//     # FORM:
//     ${JSON.stringify(report)}
    
    
//     `,
//       assistantMessage: aiPrePrompt,
//     },
//   });

//   return new Promise((resolve) => {
//     const listenerDispose = AppEvents.addEventListener(
//       "return:dataObject",
//       ({ detail: dataObject }) => {
//         // console.log("filledOutReport: dataObject", { dataObject });
//         if (dataObject.id !== returnId) {
//           return;
//         }
//         if (!isChatAnswer(dataObject)) {
//           return;
//         }
//         const { answer } = dataObject;
//         const combinedAns = `${aiPrePrompt}${answer}`;
//         const json = safe(() => JSON.parse(combinedAns), {
//           quiet: false,
//         }) as { fields: AppReportField[] };
//         resolve(json);

//         listenerDispose();
//       }
//     );
//   });
// };
