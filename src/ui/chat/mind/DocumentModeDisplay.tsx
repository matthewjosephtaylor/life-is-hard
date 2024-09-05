import { Flex, Separator, Card } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { ThoughtDocumentsDisplay } from "../../visual/ThoughtDocumentsDisplay";
import { StaticThoughtsDisplay } from "../../visual/animation/StaticThoughtsDisplay";
import { useAppModesAndParams } from "../../../state/location/useAppModesAndParams";




export const DocumentModeDisplay = ({ chat }: { chat: Chat; }) => {
  const { modes } = useAppModesAndParams();
  if (!modes.includes("doc")) {
    return <></>;
  }
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Flex
        style={{
          height: "calc(100vh - 8em)",
        }}
        direction={"column"}
        m="1"
        flexGrow="1"
      >
        <StaticThoughtsDisplay style={{ height: "100%" }} parentId={chat.id} />
        <Separator m="1" size="4" />
        <ThoughtDocumentsDisplay style={{}} chat={chat} />
      </Flex>
    </Card>
  );
};
