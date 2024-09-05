import { PopupDisplay } from "@mjtdev/engine";
import { Flex, Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import Div100vh from "react-div-100vh";
import { UnobtrusiveErrorToaster } from "../../error/UnobtrusiveErrorToaster";
import { AppLockout } from "../AppLockout";
import { Blame } from "../Blame";
import { hideLoadingScreen } from "../hideLoadingScreen";
import { AppPopup } from "../popup/AppPopup";
import { ServiceStatusDisplay } from "../status/ServiceStatusDisplay";
import { ToastDisplay } from "../toast/ToastDisplay";
import { PlaygroundMainWindow } from "./PlaygroundMainWindow";

export const PlaygroundSpa = () => {
  // const { appearance = "dark" } = useAppState();
  // const appearance = "light";
  const appearance = "dark";
  useEffect(() => {
    document.title = "AI Workforce Playground";
    hideLoadingScreen();
  }, []);
  return (
    <Theme style={{ width: "100vw", height: "100vh" }} appearance={appearance}>
      <Div100vh>
        <Flex direction={"column"} style={{ width: "100%", height: "100%" }}>
          <PlaygroundMainWindow />
        </Flex>
        <AppPopup />
        <PopupDisplay />
        <ToastDisplay />
        <AppLockout />
        <Blame />
        <UnobtrusiveErrorToaster />

        <ServiceStatusDisplay />
      </Div100vh>
    </Theme>
  );
};
