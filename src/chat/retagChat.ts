import { isNotEmpty } from "@mjtdev/engine/packages/mjtdev-object";
import type { Chat } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { askQuestionOfChatId } from "./askQuestionOfChatId";

export const retagChat = async (chatId: string) => {
  const result = await askQuestionOfChatId({
    chatId,
    systemMessage:
      "You are an expert program at chat tagging\nYou only output lists of tag names.",
    userMessage:
      "create a comma seperated list of tags for the chat session above",
    assistantMessage: "tags: ",
  });
  if (!result) {
    return;
  }
  const tags = result
    .trim()
    .split(",")
    .map((t) => t.trim())
    .filter(isNotEmpty);
  console.log({ result, tags });
  if (tags.length > 0) {
    DataObjectStates.mutateDataObject<Chat>(chatId, (c) => {
      if (!c) {
        return c;
      }
      c.tags = tags;
    });
  }
};
