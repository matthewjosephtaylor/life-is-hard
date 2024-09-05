import { isDefined, isUndefined } from "@mjtdev/engine";
import { Button, Flex } from "@radix-ui/themes";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { ChatWindow } from "../chat/ChatWindow";
import { PlaygroundHeader } from "./PlaygroundHeader";
import { createPlaygroundAssistant } from "./createPlaygroundAssistant";
import { usePlaygroundAssistant } from "./usePlaygroundAssistant";
import { AppModes } from "../../state/location/AppModes";
import { useCurrentChat } from "../chat/useCurrentChat";
import { startNewPlaygroundChat } from "./startNewPlaygroundChat";

export const PlaygroundMainWindow = () => {
  const assistantId = AppModes.useAppHashParam("assistantId");
  const { assistantCharacter, userCharacter, loaded } =
    usePlaygroundAssistant();

  const { chat } = useCurrentChat();
  useEffect(() => {
    if (isUndefined(chat)) {
      setTimeout(() => {
        startNewPlaygroundChat();
      }, 1000);
    }
  }, [chat]);

  useEffect(() => {
    if (isUndefined(assistantId)) {
      createPlaygroundAssistant().then(() => {
        location.reload();
      });
    }
  }, [assistantId]);

  if (isUndefined(assistantCharacter)) {
    return (
      <>
        <Button
          onClick={() => {
            createPlaygroundAssistant();
          }}
        >
          Create Playground
        </Button>
      </>
    );
  }

  return (
    <Flex
      gap="1em"
      direction={"column"}
      style={{ width: "100%", height: "100%" }}
    >
      <Flex direction={"column"} align={"center"} style={{ width: "100%" }}>
        <PlaygroundHeader />
      </Flex>
      <Flex style={{ height: "100%", width: "100%" }}>
        <ChatWindow />
      </Flex>
    </Flex>
  );
};
