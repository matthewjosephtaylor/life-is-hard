import { Flex } from "@radix-ui/themes";
import { useAppState } from "../state/app/AppState";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { AppButtonGroup } from "../ui/common/AppButtonGroup";
import { AppMessages, AppObjects } from "ai-worker-common";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { getUserState } from "../state/user/UserState";
import { useChatStatus } from "../ui/chat/history/useChatStatus";
import { useCurrentChat } from "../ui/chat/useCurrentChat";

export const PlayWidget = () => {
  // const { appInterfaceId } = useAppState();
  // console.log(appInterfaceId);

  // const appInterface = DataObjectStates.useDataObject(appInterfaceId);
  // const characters = DataObjectStates.useChildDataObjects(
  //   getUserState().id,
  //   "app-character"
  // );
  // console.log(characters);
  const { chat } = useCurrentChat();

  const aiCharacterId =
    "app-character-1714755882806-4760e456-98a2-4382-a3ac-539b532f43ca";
  return (
    <Flex gap="2" direction={"column"}>
      Play Chat: {chat?.id ?? "NONE"}
      <AppButtonGroup
        actions={{
          dump: () => DataObjectStates.dumpDataObjects(),
          play: () => {
            AppMessagesState.dispatch({
              type: "chat:start",
              detail: { aiCharacterId },
            });
          },
        }}
      />
    </Flex>
  );
};
