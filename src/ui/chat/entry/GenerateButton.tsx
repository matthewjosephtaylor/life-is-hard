import { IconButton, Tooltip } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import type { CSSProperties, HTMLProps } from "react";
import { abortGeneration } from "./abortGeneration";

import { IoIosSend } from "react-icons/io";
import { ChatStates } from "../../../state/chat/ChatStates";
import { useToolConfig } from "../../../aipl-components/useToolConfig";
export const GenerateButton = ({
  buttonState,
  chat,
  text,
  buttonStyle = {},
  iconStyle = {},
  onGenerate = () => {},
}: {
  buttonStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  chat: Chat;
  text: string;
  buttonState: "Generate" | "Abort";
  onGenerate?: () => void;
}) => {
  const toolConfig = useToolConfig();
  return (
    <Tooltip content="Send">
      <IconButton
        onClick={(evt) => {
          if (buttonState === "Abort") {
            abortGeneration();
          }
          if (buttonState === "Generate") {
            ChatStates.addChatMessage({ chat, text, toolConfig });
          }
          onGenerate();
        }}
        variant="outline"
        title={buttonState}
        style={buttonStyle}
      >
        {buttonState === "Generate" ? (
          <IoIosSend style={iconStyle} />
        ) : undefined}
      </IconButton>
    </Tooltip>
  );
};
