import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useAppModesAndParams } from "../state/location/useAppModesAndParams";
import { openAppSettingsPopup } from "./AppSettingsPopup";
import {
  storeAppState,
  updateAppState,
  useAppState,
} from "../state/app/AppState";
import { AppIconButton } from "./common/AppIconButton";
import { CiLight } from "react-icons/ci";
import type { ReactNode } from "react";
import { GrSystem } from "react-icons/gr";
import { MdOutlineDarkMode } from "react-icons/md";
import { ActiveGroupDisplay } from "./ActiveGroupDisplay";
import { UserBadge } from "./UserBadge";

export const Logo = () => {
  const { modes } = useAppModesAndParams();
  const { appearance = "dark" } = useAppState();

  const appearances: (typeof appearance)[] = ["dark", "light"];

  const appearanceIcons: Record<typeof appearance, ReactNode> = {
    inherit: <GrSystem />,
    light: <CiLight />,
    dark: <MdOutlineDarkMode />,
  };

  const appearanceIcon = appearanceIcons[appearance];
  const logoSrc =
    appearance === "dark"
      ? "images/intelligage-white.png"
      : "images/intelligage-black.png";

  if (modes.includes("pap")) {
    return <></>;
  }
  return (
    <Flex align={"center"} mr="2" style={{ whiteSpace: "nowrap" }}>
      <Text
        m="2"
        onClick={() => openAppSettingsPopup()}
        style={{
          userSelect: "none",
        }}
      >
        <Flex align={"center"} gap="1ch">
          <img style={{ maxHeight: "1em" }} src={logoSrc} />
          <Text>AI Workforce</Text>
        </Flex>
      </Text>
      <Box flexGrow={"1"} />
      <ActiveGroupDisplay />
      <UserBadge />
      <AppIconButton
        onClick={async () => {
          const idx = appearances.indexOf(appearance);
          const next = (idx + 1) % appearances.length;
          updateAppState((s) => {
            s.appearance = appearances[next];
          });
          await storeAppState();
        }}
        tooltip={`${appearance} theme`}
        variant="ghost"
      >
        {appearanceIcon}
      </AppIconButton>
    </Flex>
  );
};
