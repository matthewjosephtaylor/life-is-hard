import { isDefined } from "@mjtdev/engine";
import type { ChatMessage } from "./ChatMessage";

export type PromptText = {
  text: string;
  role: "user" | "system" | "assistant";
};

export const chatMessagesToPromptTextsChatML = (
  messages: ChatMessage[]
): PromptText[] => {
  const messageStart = "<|im_start|>";
  const messageEnd = "<|im_end|>";
  return messages
    .map((message, i) => {
      const author = message.name ?? message.role;
      const text =
        message.content.type === "text"
          ? message.content.parts.join("").trim()
          : "";

      if (i === messages.length - 1) {
        return {
          role: message.role,
          text: `${messageStart}${author}\n${text}`,
        };
      }
      return {
        role: message.role,
        text: `${messageStart}${author}\n${text}${messageEnd}`,
      };
    })
    .filter(isDefined);
};
