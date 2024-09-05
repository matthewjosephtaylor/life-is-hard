import { isDefined } from "@mjtdev/engine";
import type { ChatMessage } from "./ChatMessage";
import { capitalizeFirstCharacter } from "../ui/chat/capitalizeFirstCharacter";


export const chatMessagesToPromptTexts = (
  messages: ChatMessage[]
): string[] => {
  return messages
    .filter((n) => n.role !== "system")
    .map((node) => {
      const text = node.content.type === "text" ? node.content.parts.join("").trim() : "";
      // return `${capitalizeFirstCharacter(node.role)}: ${text}`;
      // return `${node.name}: ${text}`;
      // return `<${node.name}: ${text}>`;
      // return `[I]${node.name}: ${text}[/I]`;
      return `[I]${capitalizeFirstCharacter(node.role)}: ${text}[/I]`;
    })
    .filter(isDefined);
};
