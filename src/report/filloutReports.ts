// import { isDefined } from "@mjtdev/engine";
// import { AppCharacter, Chat } from "ai-worker-common";
// import { DataObjectStates } from "../state/data-object/DataObjectsState";
// import { updateReportsState } from "../ui/chat/mind/report/ReportsDisplay";
// import { characterToReports } from "./characterToReports";
// import { fillOutReport } from "./fillOutReport";

// export const fillOutReports = async (chat: Chat) => {
//   // console.log(`filling out reports for: ${chat.id}`);
//   const messages = DataObjectStates.getChildDataObjects(
//     chat.id,
//     "chat-message",
//     ""
//   );
//   const { aiCharacterId, userCharacterId } = chat;
//   const aiCharacter =
//     DataObjectStates.getDataObject<AppCharacter>(aiCharacterId);
//   const userCharacter =
//     DataObjectStates.getDataObject<AppCharacter>(userCharacterId);

//   const aiReports = characterToReports(aiCharacter).filter(isDefined);
//   const userReports = characterToReports(userCharacter).filter(isDefined);
//   const reports = [...aiReports, ...userReports].filter(isDefined);
//   for (const report of reports) {
//     const filledOutReport = await fillOutReport({ chat, messages, report });

//     // console.log("filled out report", [filledOutReport]);
//     if (!filledOutReport) {
//       console.log(`no report for: ${report.name}`);
//       continue;
//     }

//     // console.log("filloutReports: updating report state: ", { filledOutReport });
//     updateReportsState((s) => {
//       const reportIdx = s.reports.findIndex((r) => r.name === report.name);
//       const reportState = s.reports[reportIdx] ?? {
//         ...report,
//       };

//       // save state
//       reportState.fields = filledOutReport?.fields;
//       if (reportIdx !== -1) {
//         s.reports[reportIdx] = reportState;
//       } else {
//         s.reports.push(reportState);
//       }
//     });
//   }
// };
