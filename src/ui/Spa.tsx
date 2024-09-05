import { PopupDisplay } from "@mjtdev/engine";
import { Flex, Theme } from "@radix-ui/themes";
import { useAppState } from "../state/app/AppState";
import { AppLockout } from "./AppLockout";
import { Blame } from "./Blame";
import { Logo } from "./Logo";
import { MainToolbar } from "./MainToolbar";
import { AppPopup } from "./popup/AppPopup";
import { ServiceStatusDisplay } from "./status/ServiceStatusDisplay";
import { ToastDisplay } from "./toast/ToastDisplay";
import { UnobtrusiveErrorToaster } from "../error/UnobtrusiveErrorToaster";
import Div100vh from "react-div-100vh";
import { useEffect } from "react";
import { hideLoadingScreen } from "./hideLoadingScreen";

export const PowerUserSpa = () => {
  const { appearance = "dark" } = useAppState();
  useEffect(() => {
    hideLoadingScreen();
  }, []);
  return (
    <Theme style={{ width: "100vw", height: "100vh" }} appearance={appearance}>
      <Div100vh>
        <Flex direction={"column"} style={{ width: "100%", height: "100%" }}>
          <Logo />
          <MainToolbar />
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
