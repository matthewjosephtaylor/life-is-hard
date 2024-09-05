import { Box, Button, Flex, IconButton, Strong } from "@radix-ui/themes";
import type { Chat, ChatAnswer, ToolConfig } from "ai-worker-common";
import { parseTextToList } from "../../common/parseTextToList";
import { closeAppPopup } from "../../popup/closeAppPopup";
import { openAppPopup } from "../../popup/openAppPopup";

import { TfiReload } from "react-icons/tfi";
import { addChatMessage } from "../../../state/chat/addChatMessage";
import { askChatForSuggestions } from "./askChatForSuggestions";
export const openSuggestionPopup = ({
  chatAnswer,
  assistantMessage = "",
  chat,
  toolConfig,
}: {
  chat: Chat;
  assistantMessage?: string;
  chatAnswer: ChatAnswer | undefined;
  toolConfig?: ToolConfig;
}) => {
  const suggestions = parseTextToList(
    `${assistantMessage}${chatAnswer?.answer ?? ""}`
  ).map((l) => l.replaceAll('"', ""));
  closeAppPopup();
  openAppPopup(
    <Flex
      style={{
        width: "100%",
        height: "fit-content",
        maxHeight: "30vh",
        overflow: "auto",
      }}
      direction={"column"}
      wrap={"wrap"}
      gap="4"
    >
      <Flex align={"center"} gap="4">
        <Box flexGrow={"1"} />
        <Box>
          <Strong>Suggestions</Strong>
        </Box>
        <IconButton onClick={() => askChatForSuggestions({ chat })}>
          <TfiReload />
        </IconButton>
        <Box flexGrow={"1"} />
      </Flex>
      <Flex flexGrow={"1"} direction={"column"} gap="2">
        {suggestions.map((suggestion, i) => (
          <Button
            key={i}
            onClick={() => {
              addChatMessage({ toolConfig, chat, text: suggestion });
              // generateFromEntry({ chat, text: suggestion });
              closeAppPopup();
            }}
          >
            {suggestion}
          </Button>
        ))}
      </Flex>
    </Flex>,
    { style: { height: "fit-content" } }
  );
};
