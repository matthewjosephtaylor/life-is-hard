import { Objects, isUndefined } from "@mjtdev/engine";
import { Flex, Tabs } from "@radix-ui/themes";
import type { AppUser } from "ai-worker-common";
import { formatAndCapitalize } from "../common/formatAndCapitalize";
import { useAppState } from "../state/app/AppState";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { AppModes } from "../state/location/AppModes";
import { useAppModesAndParams } from "../state/location/useAppModesAndParams";
import { useUserState } from "../state/user/UserState";
import { WINDOWS } from "./WINDOWS";
import { useCurrentChat } from "./chat/useCurrentChat";
import { switchWindow } from "./switchWindow";

export const MainToolbar = () => {
  const { modes, hashParams } = useAppModesAndParams();
  const { agreedToTerms } = useAppState();
  const { authToken, id: userId } = useUserState();
  const user = DataObjectStates.useDataObject<AppUser>(userId);
  const { chat } = useCurrentChat();
  const groups = user?.groups ?? [];

  // used for indicating chat history
  const { characterId } = hashParams;

  const isAppAdmin = groups.includes("app-admin");
  const isAppSales = groups.includes("app-sales");
  const isPapMode = modes.includes("pap");

  const defaultTab: keyof typeof WINDOWS = isAppAdmin
    ? "reports"
    : isPapMode
    ? "chat"
    : "characters";

  const windowKey = AppModes.useAppHashParam<keyof typeof WINDOWS>(
    "tab",
    agreedToTerms || modes.includes("overlay") ? defaultTab : "welcome"
  );

  const adminOnlyTabs: (keyof typeof WINDOWS)[] = [
    "users",
    "services",
    "specialActions",
  ];
  const salesOnlyTabs: (keyof typeof WINDOWS)[] = ["reports"];

  const cleanWindows = Objects.entries(WINDOWS).filter((entry) => {
    if (entry[0] === "chatHistory" && isUndefined(characterId)) {
      return false;
    }
    if (entry[0] === "chat" && !chat) {
      return false;
    }
    if (adminOnlyTabs.includes(entry[0])) {
      if (isAppAdmin && !isAppSales) {
        return true;
      }
      return false;
    }
    if (salesOnlyTabs.includes(entry[0])) {
      if (isAppSales || isAppAdmin) {
        return true;
      }
      return false;
    }
    return true;
  });

  const tabTriggers = cleanWindows.map((entry, index) => {
    const [name, node] = entry;
    return (
      <Tabs.Trigger onClick={() => switchWindow(name)} key={index} value={name}>
        {formatAndCapitalize(name)}
      </Tabs.Trigger>
    );
  });

  const tabContents = cleanWindows.map((entry, index) => {
    const [name, node] = entry;
    return (
      <Tabs.Content
        style={{ width: "100%", height: "100%" }}
        key={index}
        value={name}
      >
        {node}
      </Tabs.Content>
    );
  });
  if (!authToken && !modes.includes("pap")) {
    console.log("no authToken and pap not included");
    return <></>;
  }

  return (
    <Tabs.Root style={{ height: "100%", width: "100%" }} value={windowKey}>
      <Flex
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
        direction={"column"}
      >
        {!modes.includes("pap") ? (
          <Flex>
            <Tabs.List>{tabTriggers}</Tabs.List>
          </Flex>
        ) : undefined}
        <Flex
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {tabContents}
        </Flex>
      </Flex>
    </Tabs.Root>
  );
};
