import { isDefined } from "@mjtdev/engine";
import type { ChatMessage } from "./ChatMessage";
import { capitalizeFirstCharacter } from "../ui/chat/capitalizeFirstCharacter";
import type { PromptText } from "./chatMessagesToPromptTextsChatML";


export const chatMessagesToPromptTextsPounds = (
  messages: ChatMessage[]
): PromptText[] => {
  const messageStart = "### ";
  const messageEnd = "\n";
  return messages
    .map((node, i) => {
      const text = node.content.type === "text" ? node.content.parts.join("").trim() : "";

      if (i === messages.length - 1) {
        // return { role: node.role, text: `${messageStart}${node.role}\n` };
        return {
          role: node.role,
          text: `${messageStart}${capitalizeFirstCharacter(node.role)}:\n`,
        };
      }
      return {
        role: node.role,
        text: `${messageStart}${capitalizeFirstCharacter(
          node.role
        )}:\n${text}${messageEnd}`,
      };
    })
    .filter(isDefined);
};
