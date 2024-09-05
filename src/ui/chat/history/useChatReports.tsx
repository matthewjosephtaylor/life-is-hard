import type { Chat } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";


export const useChatReports = (chat: Chat) => {
  const reportStates = DataObjectStates.useChildDataObjects(
    chat.id,
    "chat-state-entry",
    "report"
  );
  return reportStates;
};
