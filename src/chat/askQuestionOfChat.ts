import type { AppMessage } from "ai-worker-common";
import { Fetches } from "ai-worker-common";
import { getAppState } from "../state/app/AppState";
import { getUserState } from "../state/user/UserState";
import { waitFor } from "../ui/common/waitFor";
import type { Chat } from "./Chat";

export type AskQuestionOfChatProps = {
  chat?: Chat;
  systemMessage?: string;
  userMessage?: string;
  assistantMessage?: string;
  maxResponseTokens?: number;
  returnId?: string;
};
export const askQuestionOfChat = async (
  props: AskQuestionOfChatProps
): Promise<string> => {
  const {
    chat,
    systemMessage,
    userMessage,
    assistantMessage,
    maxResponseTokens,
    returnId,
  } = props;

  const message: AppMessage<"chat:ask"> = {
    type: "chat:ask",
    detail: {
      assistantMessage,
      chatId: chat?.id,
      systemMessage,
      userMessage,
      maxResponseTokens,
      returnId,
    },
  };

  const resp = await waitFor(
    Fetches.fetchWithJson({
      authToken: getUserState().authToken,
      url: `${getAppState().aiBaseUrl}/message`,
      data: message,
    }),
    {
      message: "asking...",
    }
  );
  if (!resp.ok) {
    console.log(resp);
    throw new Error(resp.statusText);
  }
  return resp.text();
};
