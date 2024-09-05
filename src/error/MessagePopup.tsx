import { useEffect, useState } from "react";
import { AppEvents } from "../event/AppEvents";
import { AppBorder } from "../ui/agent/AppBorder";
import { closeAppPopup } from "../ui/popup/closeAppPopup";
import { errorToString } from "./errorToString";
import { Text, Button, Flex } from "@radix-ui/themes";

export const MessagePopup = ({ message: message }: { message: unknown }) => {
  const [messageDisplay, setMessageDisplay] = useState("");

  AppEvents.useEventListener("function:call", (evt) => {
    if (/(close|cancel).*/i.test(evt.detail.name)) {
      closeAppPopup();
    }
  });
  useEffect(() => {
    if (!message) {
      return;
    }
    errorToString(message).then((value) => setMessageDisplay(value));
  }, [message]);
  return (
    <Flex gap="5" align={"center"} direction={"column"}>
      <Text>{messageDisplay}</Text>
      <Button
        // style={{ width: "min-content" }}
        onClick={() => closeAppPopup()}
      >
        Close
      </Button>
    </Flex>
  );
};
