import type { Chat } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { askQuestionOfChatId } from "./askQuestionOfChatId";

export const renameChat = async (chatId: string) => {
  const answer = await askQuestionOfChatId({
    chatId,
    systemMessage: "You are an expert at chat titles",
    userMessage:
      "In as few words as possible, create a short unique title for chat session above",
    assistantMessage: 'title: "',
  });
  if (!answer) {
    return;
  }
  const title = answer.trim().replace(/".*$/gim, "");
  console.log("renameChat", { answer, title });
  if (title.length > 2) {
    DataObjectStates.mutateDataObject<Chat>(chatId, (c) => {
      if (!c) {
        return c;
      }
      c.name = title;
    });
  }
};
