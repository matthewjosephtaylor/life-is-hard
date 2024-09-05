import type { Chat } from "ai-worker-common";
import { updateDataObjectsState } from "../data-object/DataObjectStates";

export const updateChat = ({
  chatId,
  updater,
}: {
  chatId: string;
  updater: (chat: Chat) => void;
}) => {
  return updateDataObjectsState((s) => {
    const cur = s.objects[chatId] as Chat;
    if (!cur) {
      return;
    }
    updater(cur);
  });
};
