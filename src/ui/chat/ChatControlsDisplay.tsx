import { Border, Grid, TextGens, isDefined } from "@mjtdev/engine";
import type { ChatTextContent} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import { useChatState } from "../../chat/ChatState";
import { FormTextAreaDisplay } from "../form/FormTextAreaDisplay";
import { useAiChatPrompt } from "./useAiChatPrompt";

export const ChatControlsDisplay = () => {
  const chat = useChatState();
  // const messages = useMessagesState();
  const messages = Chats.useChatMessages(chat);
  const prompt = useAiChatPrompt({ chat, messages });
  const promptLength = TextGens.textToTokens(prompt).length.toString();
  return (
    <Border
      style={{ overflow: "auto", maxWidth: "30vw" }}
      title="controls"
      collapsable={true}
      defaultDisclosed={false}
    >
      <Grid direction="row" cellSize={"min-content"}>
        <Grid
          style={{ maxHeight: "80vh", overflow: "auto" }}
          direction="row"
          cellSize={"min-content"}
        >
          <FormTextAreaDisplay
            key={`${chat.id}-token count`}
            title="token count"
            showTokenCount={false}
            style={{
              height: "1.5em",
            }}
            defaultValue={promptLength}
          />
          {messages
            // .filter((message) => message.chatId === chat.id)
            .filter((message) => message.role === "system")
            .map((systemNode, i) => {
              return (
                <FormTextAreaDisplay
                  key={`${chat.id}-${i}`}
                  title={`system${
                    isDefined(systemNode.name) ? ` (${systemNode.name})` : ""
                  }`}
                  style={{
                    // width: "40em",
                    height: "10em",
                  }}
                  onChange={(value) => {
                    Chats.updateChatMessage(chat, systemNode.id, (m) => {
                      m.content = {
                        type: "text",
                        parts: [value],
                      };
                    });
                  }}
                  defaultValue={(
                    systemNode.content as ChatTextContent
                  ).parts.join("")}
                />
              );
            })}
        </Grid>
      </Grid>
    </Border>
  );
};
