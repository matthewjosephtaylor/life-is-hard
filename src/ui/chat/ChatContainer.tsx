import { Flex } from "@radix-ui/themes";
import type { AppCharacter, Chat, ChatMessage } from "ai-worker-common";
import type { AccessPointTheme } from "ai-worker-common/dist/type/theme/AccessPointTheme";
import type { CSSProperties } from "react";
import { memo } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { useAppModesAndParams } from "../../state/location/useAppModesAndParams";
import { PlaygroundEditor } from "../playground/PlaygroundEditor";
import { AiplBlockEditor } from "../playground/node-based-editor/AiplBlockEditor";
import { useIsPlayground } from "../playground/useIsPlayground";
import { ChatBox } from "./ChatBox";
import { ChatDebugDisplay } from "./mind/ChatDebugDisplay";
import { ChatCharacterEditor } from "./mind/ChatDebugEditor";
import { DocumentModeDisplay } from "./mind/DocumentModeDisplay";
import { AssistedEditorDisplay } from "./mind/assisted-editor/AssistedEditorDisplay";
import { ChatStateDisplay } from "./mind/report/ChatStateDisplay";
import { stringifyEq } from "./stringifyEq";

export const ChatContainer = memo(
  ({
    chat,
    messages,
    characters,
    enableControls,
    style = {},
  }: {
    messages: readonly ChatMessage[];
    style?: CSSProperties;
    chat: Chat;
    activeTheme?: Partial<AccessPointTheme>;
    characters: Record<string, AppCharacter>;
    enableControls?: boolean;
  }) => {
    const assistantCharacter = DataObjectStates.useDataObject<AppCharacter>(
      chat.aiCharacterId
    );
    const isPlayground = useIsPlayground();
    const { modes } = useAppModesAndParams();

    if (modes.includes("overlay")) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <ChatBox
            enableControls={enableControls}
            chat={chat}
            messages={messages}
            characters={characters}
          />
        </div>
      );
    }

    return (
      <Flex
        gap="0.5em"
        flexGrow={"1"}
        style={{
          height: "100%",
          width: "100%",
          ...style,
        }}
      >
        {isPlayground ? (
          <Flex
            display={{
              initial: "none",
              md: "flex",
            }}
          >
            <Flex
              style={{
                height: "calc(100vh - 8em)",
                maxWidth: "90ch",
              }}
              direction={"column"}
              m="1"
              flexGrow="1"
            >
              <PlaygroundEditor />
            </Flex>
          </Flex>
        ) : undefined}
        <ChatBox
          enableControls={enableControls}
          chat={chat}
          messages={messages}
          characters={characters}
        />
        {isPlayground || modes.includes("block") ? (
          <Flex
            display={{
              initial: "none",
              md: "flex",
            }}
          >
            <Flex
              style={{
                height: "calc(100vh - 8em)",
                width: "100%",
                minWidth: "40ch",
              }}
              direction={"column"}
              m="1"
              flexGrow="1"
            >
              <AiplBlockEditor
                flexGrow={"1"}
                characterId={assistantCharacter?.id}
                // defaultValue={assistantCharacter?.card.data.description}
                style={{ height: "100%", width: "100%" }}
              />
            </Flex>
          </Flex>
        ) : undefined}
        <Flex
          display={{
            initial: "none",
            md: "flex",
          }}
        >
          <ChatDebugDisplay chat={chat} />
        </Flex>
        <Flex
          display={{
            initial: "none",
            sm: "flex",
          }}
          flexGrow={"1"}
        >
          <ChatStateDisplay
            style={{
              minWidth: "20ch",
              maxHeight: "80vh",
              overflow: "auto",
              wordBreak: "break-word",
            }}
            chat={chat}
          />
        </Flex>
        <Flex
          display={{
            initial: "none",
            md: "flex",
          }}
        >
          <Flex
            style={{
              height: "calc(100vh - 8em)",
            }}
            direction={"column"}
            m="1"
            flexGrow="1"
          >
            <AssistedEditorDisplay chat={chat} />
          </Flex>
        </Flex>
        <Flex
          display={{
            initial: "none",
            md: "flex",
          }}
        >
          <DocumentModeDisplay chat={chat} />
        </Flex>
        <Flex
          display={{
            initial: "none",
            lg: "flex",
          }}
        >
          <ChatCharacterEditor character={assistantCharacter} chat={chat} />
        </Flex>
      </Flex>
    );
  },
  stringifyEq
);
