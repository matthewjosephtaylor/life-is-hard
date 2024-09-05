import { IconButton, Tooltip } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { memo, type CSSProperties } from "react";
import { GiBrain } from "react-icons/gi";
import { useToolConfig } from "../../../aipl-components/useToolConfig";
import { stringifyEq } from "../stringifyEq";
import { askChatForSuggestions } from "./askChatForSuggestions";

export const SuggestedEntriesButton = memo(
  ({
    chat,
    iconStyle,
    buttonStyle,
  }: {
    chat: Chat | undefined;
    iconStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
  }) => {
    const toolConfig = useToolConfig();
    return (
      <Tooltip content="Suggestions">
        <IconButton
          variant="outline"
          onClick={() => askChatForSuggestions({ chat, toolConfig })}
          style={buttonStyle}
        >
          <GiBrain style={iconStyle} />
        </IconButton>
      </Tooltip>
    );
  },
  stringifyEq
);
