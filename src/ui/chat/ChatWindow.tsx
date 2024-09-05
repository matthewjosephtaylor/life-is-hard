import { Center, Objects, first, isDefined } from "@mjtdev/engine";
import { useEffect } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";
import { Waitable } from "../image/Waitable";
import { ChatContainer } from "./ChatContainer";
import { getCurrentChat } from "./getCurrentChat";
import { useCurrentChat } from "./useCurrentChat";
import { useIsMobile } from "../common/useIsMobile";
import { DataImage } from "../image/DataImage";
import { Flex } from "@radix-ui/themes";

export const ChatWindow = () => {
  const { chat, messages } = useCurrentChat();
  const activeTheme = first(
    DataObjectStates.useChildDataObjects(
      chat?.id,
      "access-point-theme",
      "active"
    )
  );

  const characters = DataObjectStates.useDataObjectsById<"app-character">(
    [chat?.aiCharacterId, chat?.userCharacterId].filter(isDefined)
  );
  const isMobile = useIsMobile();
  const isPapMode = AppModes.useAppModesAndParams().modes.includes("pap");
  const enableControls = isMobile || isPapMode ? false : true;

  useEffect(() => {
    // performance to prepopulate cache for first ASR call
    getCurrentChat();
  }, []);

  const { backgroundColor, bannerText, bannerUrl, color, logoDataId } =
    activeTheme ?? {};

  const themeBannerLink = isDefined(bannerText) ? (
    <a target="_blank" rel="noopener noreferrer" href={bannerUrl}>
      {bannerText}
    </a>
  ) : undefined;
  const themeLogo = isDefined(logoDataId) ? (
    <a target="_blank" rel="noopener noreferrer" href={bannerUrl}>
      <DataImage
        style={{
          maxWidth: "1.5em",
          maxHeight: "1.5em",
        }}
        dataId={logoDataId}
      />
    </a>
  ) : undefined;

  if (!chat || !characters) {
    return (
      <Waitable>
        <Center>
          <div style={{ width: "50vw", height: "50vh" }} />
        </Center>
      </Waitable>
    );
  }
  return (
    <Flex
      direction={"column"}
      align={"center"}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        color,
      }}
    >
      <Flex
        align={"center"}
        gap="1em"
        style={{
          fontSize: "0.8em",
        }}
      >
        {themeLogo}
        {themeBannerLink}
      </Flex>
      <ChatContainer
        chat={chat}
        messages={messages}
        activeTheme={activeTheme}
        characters={Objects.fromEntries(
          characters.map((character) => [character.id, character] as const)
        )}
        enableControls={enableControls}
      />
    </Flex>
  );
};
