import { Colors, Reacts } from "@mjtdev/engine";
import { Card, Flex } from "@radix-ui/themes";
import type { AppCharacter, Chat } from "ai-worker-common";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useToolConfig } from "../../../aipl-components/useToolConfig";
import { useCustomAsrState } from "../../../asr-custom/updateCustomAsrState";
import { AppEvents } from "../../../event/AppEvents";
import { useAppState } from "../../../state/app/AppState";
import { ChatStates } from "../../../state/chat/ChatStates";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AppModes } from "../../../state/location/AppModes";
import { interruptTts } from "../../../tts/custom/interruptTts";
import { CharacterAvatar } from "../../character/CharacterAvatar";
import type { AppTextAreaRef } from "../../common/AppTextArea";
import { AppTextArea } from "../../common/AppTextArea";
import { useIsPlayground } from "../../playground/useIsPlayground";
import { AudioContextVisualization } from "../AudioContextVisualization";
import { AdvancedChatEntryControls } from "./AdvancedChatEntryControls";
import { BasicChatEntryControls } from "./BasicChatEntryControls";
import { ChatStartersDisplay } from "./ChatStartersDisplay";

export const ChatTextEntry = ({ chat }: { chat: Chat }) => {
  const isPlayground = useIsPlayground();
  const { modes } = AppModes.useAppModesAndParams();

  const isBasicUser = modes.includes("pap") || isPlayground;
  const isVoxMode = modes.includes("vox");
  const textRef = useRef<AppTextAreaRef>(null);
  const userCharacter = DataObjectStates.useDataObject<AppCharacter>(
    chat?.userCharacterId
  );
  const toolConfig = useToolConfig();

  const { appearance } = useAppState();

  const audioVisualizationColor =
    appearance === "dark"
      ? Colors.from("white").alpha(0.66).darken(0.1).toString()
      : Colors.from("black").alpha(0.66).lighten(0.1).toString();

  const {
    speaking: asrSpeaking,
    enabled: asrEnabled,
    micContext,
    muffled,
    micSource,
  } = useCustomAsrState();

  const [buttonState, setButtonState] = useState<"Generate" | "Abort">(
    "Generate"
  );
  const [text, setText] = useState("");
  AppEvents.useEventListener("finished-generation", () => {
    setButtonState("Generate");
  });

  AppEvents.useEventListener(
    "asrUtterance",
    (evt) => {
      console.log("asrUtterance");
      if (!chat) {
        console.log("NO CHAT");
        return;
      }
      ChatStates.addChatMessage({ chat, text: evt.detail });
      if (textRef.current) {
        textRef.current.setValue("");
      }
    },
    [chat]
  );
  AppEvents.useEventListener(
    "asrMumble",
    (evt) => {
      console.log("asrMumble");
      if (textRef.current) {
        textRef.current.setValue(evt.detail);
      }
    },
    [chat]
  );

  Reacts.useKeyboardListener({
    ESCAPE: () => {
      interruptTts("escape button pressed");
    },
  });

  const userAvatar = userCharacter ? (
    <CharacterAvatar
      hoverActions={[]}
      style={{ maxHeight: "5em", maxWidth: "8em", marginRight: "1em" }}
      imageStyle={{ maxHeight: "2em", maxWidth: "2em" }}
      nameStyle={{
        maxWidth: "8em",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
      character={userCharacter}
    />
  ) : undefined;

  return (
    <Flex direction={"column"} flexShrink={"1"}>
      <Card style={{ height: "100%" }}>
        <Flex direction={"column"} style={{ height: "100%" }}>
          <ChatStartersDisplay chat={chat} />
          <Flex
            align={"center"}
            style={{ height: "100%", position: "relative" }}
          >
            <Flex align={"center"}>{userAvatar}</Flex>
            <AnimatePresence>
              {asrEnabled && asrSpeaking && !muffled ? (
                <motion.div
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"exit"}
                  variants={{
                    hidden: {
                      opacity: 0,
                      transition: { duration: 0.5 },
                    },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                    exit: {
                      opacity: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  key={`${chat.id}-${asrEnabled}-${asrSpeaking}-motion`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "absolute",
                    width: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <Flex align={"baseline"}>
                    <AudioContextVisualization
                      audioContext={micContext}
                      color={audioVisualizationColor}
                      getSource={() => micSource}
                      key={`${chat.id}-asr-visualization-${asrEnabled}-${asrSpeaking}`}
                      style={{
                        filter: "blur(2em)",
                        height: "5em",
                        width: "80vw",
                        pointerEvents: "none",
                      }}
                    />
                  </Flex>
                </motion.div>
              ) : undefined}
            </AnimatePresence>
            <Flex
              style={{ height: "100%" }}
              flexGrow={"1"}
              gap="2"
              direction={"column"}
              align={"center"}
            >
              <AnimatePresence>
                {isVoxMode ? undefined : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key="vox-text-area-motion"
                    style={{
                      width: "100%",
                    }}
                  >
                    <AppTextArea
                      ref={textRef}
                      autoFocus={true}
                      style={{
                        flexGrow: "1",
                        minWidth: "10ch",
                        // maxWidth: "40ch",
                        width: "100%",
                        overflow: "auto",
                        maxHeight: "10em",
                      }}
                      onKeyDown={(evt) => {
                        if (evt.key === "Enter" && !evt.shiftKey) {
                          evt.preventDefault();
                        }
                      }}
                      onKeyUp={async (evt) => {
                        if (evt.key === "Enter" && !evt.shiftKey) {
                          evt.preventDefault();
                          ChatStates.addChatMessage({ chat, text, toolConfig });
                          if (textRef.current) {
                            textRef.current.setValue("");
                            setText("");
                          }
                        }
                      }}
                      onChange={(value) => {
                        setText(value);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Flex
                // style={{ width: "50%" }}
                wrap={"wrap"}
                align={"center"}
                flexGrow={"1"}
                // direction={"column"}
              >
                {isBasicUser ? (
                  <BasicChatEntryControls
                    chat={chat}
                    text={text}
                    onGenerate={() => {
                      if (textRef.current) {
                        textRef.current.setValue("");
                        setText("");
                      }
                    }}
                  />
                ) : (
                  <AdvancedChatEntryControls
                    onGenerate={() => {
                      if (textRef.current) {
                        textRef.current.setValue("");
                        setText("");
                      }
                    }}
                    buttonState={buttonState}
                    text={text}
                    chat={chat}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
