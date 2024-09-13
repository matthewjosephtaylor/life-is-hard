import { isUndefined, PopupDisplay } from "@mjtdev/engine";
import { Theme, type ThemeProps } from "@radix-ui/themes";
import { UnobtrusiveErrorToaster } from "../error/UnobtrusiveErrorToaster";
import { useAppState } from "../state/app/AppState";
import { AppLockout } from "../ui/AppLockout";
import { ChatWindow } from "../ui/chat/ChatWindow";
import { AppPopup } from "../ui/popup/AppPopup";
import { ToastDisplay } from "../ui/toast/ToastDisplay";

import { AppEvents } from "../event/AppEvents";
import { StandbyNoticer } from "../ui/notice/StandbyNoticer";

export const AiplChatWindow = ({
  onUpdate = () => {},
  ...rest
}: {
  onUpdate?: (componentState: unknown) => void;
} & ThemeProps) => {
  const { appearance = "dark" } = useAppState();
  AppEvents.useEventListener(
    "client:aiplComponentUpdate",
    (message) => {
      const { data: componentState } = message.detail;
      if (isUndefined(componentState)) {
        return;
      }
      onUpdate(componentState);
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
