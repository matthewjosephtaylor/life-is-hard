import { Apps } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import type { Chat } from "./Chat";
import { askQuestionOfChat } from "./askQuestionOfChat";

export const askQuestionOfChatId = async (params: {
  chatId?: string;
  systemMessage?: string;
  userMessage?: string;
  assistantMessage?: string;
  stop?: string | string[];
  stopAfter?: string[];
  signal?: AbortSignal;
  abortController?: AbortController;
}) => {
  const { chatId } = params;
  const chat = await DataObjectStates.getDataObject<Chat>(chatId);
  if (!chat) {
    Apps.error(`No chat for: ${chatId}`);
    return undefined;
  }
  return askQuestionOfChat({ ...params, chat });
};
