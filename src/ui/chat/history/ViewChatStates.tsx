import { BrowserFiles, Objects } from "@mjtdev/engine";
import { Button, Flex, Separator, Strong } from "@radix-ui/themes";
import { Chats, type Chat, type ChatStateEntry } from "ai-worker-common";
import { unparse } from "papaparse";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AppTable } from "../../common/app-table/AppTable";
import { MarkdownTextDisplay } from "../message/MarkdownTextDisplay";

export const ViewChatStates = ({ chat }: { chat: Chat }) => {
  const normalStates = DataObjectStates.useChildDataObjects(
    chat.id,
    "chat-state-entry",
    ""
  );
  const facts = Chats.chatStateEntriesToFacts(normalStates);
  const factRecords = Objects.entries(facts).map(
    (f) => ({ name: f[0], value: f[1] } as const)
  );
  return (
    <Flex gap={"2"} direction={"column"} align={"center"}>
      <Flex align={"center"} flexGrow="1" gap="2">
        <Strong>Chat States</Strong>
        <Button
          onClick={() => {
            // const cleaned = normalStates.map(({ node, ...rest }) => ({
            //   ...rest,
            // }));
            const csv = unparse(factRecords);
            BrowserFiles.writeFileBrowser(`${chat.id}-state.csv`, csv);
          }}
        >
          Download
        </Button>
      </Flex>
      <Separator size={"4"} />
      <AppTable
        style={{ maxWidth: "900vw", maxHeight: "80vh", overflow: "auto" }}
        headers={["name", "value"]}
        records={factRecords}
        cellRenderMap={{
          value: (value) => <MarkdownTextDisplay text={value ?? ""} />,
        }}
      />
    </Flex>
  );
};
