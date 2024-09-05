import type { AskQuestionOfChatProps } from "../chat/askQuestionOfChat";

export const askIdleAiQuestionOfChat = (props: AskQuestionOfChatProps) => {
  const abortController = new AbortController();
  // detect when the AI is busy
};

export const Idles = {
  askIdleAiQuestionOfChat,
};
