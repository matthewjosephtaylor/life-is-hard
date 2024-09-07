import { isUndefined, PopupDisplay } from "@mjtdev/engine";
import { Button, Flex, Theme } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { UnobtrusiveErrorToaster } from "../error/UnobtrusiveErrorToaster";
import { useAppState } from "../state/app/AppState";
import { AppLockout } from "../ui/AppLockout";
import { ChatWindow } from "../ui/chat/ChatWindow";
import { AppPopup } from "../ui/popup/AppPopup";
import { ToastDisplay } from "../ui/toast/ToastDisplay";

import { RiCloseCircleLine } from "react-icons/ri";
import { AppIconButton } from "../ui/common/AppIconButton";

import { AppEvents } from "../event/AppEvents";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";

export const AiplChat = ({
  onUpdate = () => {},
}: {
  onUpdate?: (context: AiplComponentContextState) => void;
}) => {
  const { appearance = "dark" } = useAppState();
  const [state, setState] = useState({
    open: false,
  });
  const context = useContext(AiplComponentContext);
  if (!context || !context.typeInfo) {
    throw new Error(
      "AiplFormConfigContext is not provided, make sure to wrap your component with AiplFormConfigProvider"
    );
  }
  AppEvents.useEventListener(
    "client:aiplComponentUpdate",
    (message) => {
      const { data: componentState } = message.detail;
      if (isUndefined(componentState)) {
        return;
      }
      onUpdate(context);
    },
    [onUpdate]
  );

  return (
    <Theme
      style={{
        width: state.open ? "40ch" : "fit-content",
        position: "absolute",
        height: state.open ? "80vh" : "fit-content",
        bottom: "0.5em",
        right: "0.5em",
        minHeight: 0,
        border: "0.3em solid grey",
        borderRadius: "1em",

        pointerEvents: "auto",
      }}
      appearance={appearance}
    >
      <Flex
        direction={"column"}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {state.open ? (
          <AppIconButton
            onClick={() => {
              setState({ open: false });
            }}
            color={"gray"}
            style={{
              position: "absolute",
              left: "-0.5em",
              top: "-0.5em",
              borderRadius: "1em",
            }}
          >
            <RiCloseCircleLine size={"2em"} />
          </AppIconButton>
        ) : undefined}
        <Flex
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {state.open ? (
            <ChatWindow />
          ) : (
            <Button
              onClick={() => {
                setState({ open: true });
              }}
            >
              Chat
            </Button>
          )}
        </Flex>
      </Flex>

      <AppPopup />
      <PopupDisplay />
      <ToastDisplay />
      <AppLockout />
      <UnobtrusiveErrorToaster />
    </Theme>
  );
};
