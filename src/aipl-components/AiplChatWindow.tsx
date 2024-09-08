import { isUndefined, PopupDisplay } from "@mjtdev/engine";
import { Theme, type ThemeProps } from "@radix-ui/themes";
import { useContext } from "react";
import { UnobtrusiveErrorToaster } from "../error/UnobtrusiveErrorToaster";
import { useAppState } from "../state/app/AppState";
import { AppLockout } from "../ui/AppLockout";
import { ChatWindow } from "../ui/chat/ChatWindow";
import { AppPopup } from "../ui/popup/AppPopup";
import { ToastDisplay } from "../ui/toast/ToastDisplay";

import { AppEvents } from "../event/AppEvents";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";
import { StandbyNoticer } from "../ui/notice/StandbyNoticer";

export const AiplChatWindow = ({
  onUpdate = () => {},
  ...rest
}: {
  onUpdate?: (context: AiplComponentContextState) => void;
} & ThemeProps) => {
  const { appearance = "dark" } = useAppState();
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
    <Theme appearance={appearance} {...rest}>
      <ChatWindow />
      <AppPopup />
      <PopupDisplay />
      <ToastDisplay />
      <AppLockout />
      <UnobtrusiveErrorToaster />
      <StandbyNoticer />
    </Theme>
  );
};
