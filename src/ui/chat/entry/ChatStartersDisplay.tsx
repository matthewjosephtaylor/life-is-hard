import { isDefined } from "@mjtdev/engine";
import { Button, Flex } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { useToolConfig } from "../../../aipl-components/useToolConfig";
import { addChatMessage } from "../../../state/chat/addChatMessage";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AppModes } from "../../../state/location/AppModes";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";

export const ChatStartersDisplay = ({ chat }: { chat: Chat }) => {
  const chatStarters = DataObjectStates.useChildDataObjects(
    chat.id,
    "chat-starter"
  );

  const isDevMode = AppModes.useAppModesAndParams().modes.includes("dev");
  const toolConfig = useToolConfig();

  return (
    <Flex gap="2" wrap="wrap">
      {isDevMode ? (
        <Button
          onClick={() => {
            AppMessagesState.dispatch({
              type: "chat:end",
              detail: chat.id,
            });
          }}
        >
          End Chat
        </Button>
      ) : undefined}
      {chatStarters
        .filter((starter) => isDefined(starter.text))
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((starter, i) => (
          <Button
            onClick={() => {
              addChatMessage({ chat, text: starter.text, toolConfig });
              chatStarters.forEach((s) =>
                DataObjectStates.deleteDataObject(s.id)
              );
            }}
            key={i}
          >
            {starter.text}
          </Button>
        ))}
    </Flex>
  );
};
