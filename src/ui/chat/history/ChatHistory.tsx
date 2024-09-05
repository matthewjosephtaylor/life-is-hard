import { Flex, Strong } from "@radix-ui/themes";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AppTable } from "../../common/app-table/AppTable";
import { ChatActions } from "./ChatActions";
import { ChatReportsDisplay } from "./ChatReportsDisplay";
import { ChatStatusDisplay } from "./ChatStatusDisplay";
import type { AppCharacter } from "ai-worker-common";

export const ChatHistory = ({ characterId }: { characterId: string }) => {
  const chats = DataObjectStates.useChildDataObjects(characterId, "chat");
  const character = DataObjectStates.useDataObject<AppCharacter>(characterId);
  const characterNotes = character?.card.data.creator_notes
    ? `(${character?.card.data.creator_notes})`
    : "";

  return (
    <Flex gap="4" direction={"column"}>
      <Flex>
        {/* <Button
          color="red"
          onClick={() => {
            clearChatHistory(characterId);
          }}
        >
          Clear Chat History
        </Button> */}
      </Flex>
      <Strong>
        {character?.card.data.name ?? ""} {characterNotes}
      </Strong>
      <AppTable
        style={{
          maxHeight: "calc(100vh - 15em)",
          overflow: "auto",
        }}
        records={chats}
        headers={[
          "name",
          "tags",
          "modification",
          "creation",
          "status",
          "reports",
          "actions",
        ]}
        sort={(a, b) => {
          if (a.modification === b.modification) {
            return 0;
          }
          return a.modification > b.modification ? -1 : 1;
        }}
        cellRenderMap={{
          modification: (value) => new Date(value).toLocaleDateString(),
          creation: (value) => new Date(value).toLocaleDateString(),
          status: (_, chat) => <ChatStatusDisplay chat={chat} />,
          reports: (_, chat) => <ChatReportsDisplay chat={chat} />,
          actions: (_, chat) => <ChatActions chat={chat} />,
        }}
      />
    </Flex>
  );
};
