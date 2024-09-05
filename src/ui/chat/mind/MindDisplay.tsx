import { Text, Flex, Separator, Strong } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { ThoughtDocumentsDisplay } from "../../visual/ThoughtDocumentsDisplay";
import { StaticThoughtsDisplay } from "../../visual/animation/StaticThoughtsDisplay";
import { AssistedEditorDisplay } from "./assisted-editor/AssistedEditorDisplay";
import { memo } from "react";
import { stringifyEq } from "../stringifyEq";
import { Big } from "../../common/Big";
import { ChatCharacterEditor } from "./ChatDebugEditor";

/** @deprecated */
export const MindDisplay = memo(({ chat }: { chat: Chat }) => {
  const calls = DataObjectStates.useChildDataObjects(chat.id, "function-call");

  return (
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
      {/* <ChatCharacterEditor chat={chat} /> */}
      {/* {calls.length === 0 ? (
        <>
        </>
      ) : (
        <>
          <AssistedEditorDisplay chat={chat} />
        </>
      )} */}
    </Flex>
  );
}, stringifyEq);
