import type { Chat, ChatStatus } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";

export const useChatStatus = (chat: Chat) => {
  const activeStatuses = DataObjectStates.useChildDataObjects(
    chat.id,
    "chat-state-entry",
    "active"
  );
  const endedStatuses = DataObjectStates.useChildDataObjects(
    chat.id,
    "chat-state-entry",
    "ended"
  );
  const currentStatus = [...activeStatuses, ...endedStatuses][0];
  const status: ChatStatus = currentStatus
    ? (currentStatus.value as ChatStatus) ?? "unknown"
    : "unknown";

  return status;
};
