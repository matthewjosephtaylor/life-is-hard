import {
  Colors,
  isDefined,
  type ByteLike,
  type CssStyle,
} from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import {
  AppImages,
  AppVideos,
  Datas,
  type AppCharacter,
  type Chat,
  type ChatMessage,
} from "ai-worker-common";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useAppState } from "../../state/app/AppState";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { DatasState } from "../../state/data/DatasState";
import { AppModes } from "../../state/location/AppModes";
import { getTtsState } from "../../tts/TtsState";
import { useIsTtsSpeaking } from "../../tts/useIsTtsSpeaking";
import { CharacterAvatar } from "../character/CharacterAvatar";
import { AudioContextVisualization } from "./AudioContextVisualization";
import { ChatDisplay } from "./ChatDisplay";
import { ChatTextEntry } from "./entry/ChatTextEntry";
import { stringifyEq } from "./stringifyEq";
import { getHomeAuth } from "../../state/getHomeAuth";

export const ChatBox = memo(
  ({
    chat,
    messages,
    characters,
    style = {},
    enableControls,
  }: {
    messages: readonly ChatMessage[];
    characters: Record<string, AppCharacter>;
    chat: Chat;
    style?: CssStyle;
    enableControls?: boolean;
  }) => {
    const MIN_AVATAR_SHOW_HEIGHT_PX = 800;
    const [windowHeight, setWindowHeight] = useState(0);
    const { modes } = AppModes.useAppModesAndParams();
    const { audioContext: ttsAudioContext } = getTtsState();
    const { appearance } = useAppState();

    const ttsSpeaking = useIsTtsSpeaking();

    const audioVisualizationColor =
      appearance === "dark"
        ? Colors.from("white").darken(0.1).alpha(0.66).toString()
        : Colors.from("black").lighten(0.1).alpha(0.66).toString();

    const isVoxMode = modes.includes("vox");
    useEffect(() => {
      const update = () => {
        setWindowHeight(window.innerHeight);
      };
      const observer = new ResizeObserver(update);
      update();
      observer.observe(document.body);
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [document.body]);
    const aiCharacter = chat.aiCharacterId
      ? characters[chat.aiCharacterId]
      : undefined;
    const greetingAppVideo = DataObjectStates.useChildDataObjects(
      aiCharacter?.id,
      "app-video",
      "greeting"
    )[0];
    const [greetingVideo, setGreetingVideo] = useState<ByteLike | undefined>(
      undefined
    );
    useEffect(() => {
      if (isDefined(aiCharacter?.imageDataId)) {
        Datas.getRemoteData({
          id: aiCharacter.imageDataId,
          ...getHomeAuth(),
        }).then(async (resp) => {
          if (!resp.ok) {
            return;
          }
          const blob = await resp.blob();
          const { videoPack } =
            await AppImages.pngToTavernCardAndVoiceSample(blob);
          if (isDefined(videoPack)) {
            const videos = AppVideos.videoPackToVideoRecords(videoPack);
            setGreetingVideo(videos["greeting"]);
            return;
          }
        });
        if (isDefined(greetingAppVideo)) {
          DatasState.dataIdToBlob(greetingAppVideo.dataId).then((blob) =>
            setGreetingVideo(blob)
          );
          return;
        }
      }
    }, [aiCharacter, greetingAppVideo]);

    const avatar = aiCharacter ? (
      <CharacterAvatar
        hoverActions={["Chat With {char}"]}
        imageStyle={{ maxWidth: "4em" }}
        character={aiCharacter}
        video={greetingVideo}
      />
    ) : undefined;
    return (
      <Flex
        direction={"column"}
        gap="2"
        style={{
          height: "100%",
          width: "100%",
          ...style,
        }}
      >
        <Flex
          display={windowHeight > MIN_AVATAR_SHOW_HEIGHT_PX ? "flex" : "none"}
          direction={"column"}
          align={"center"}
          flexShrink={"1"}
          style={{
            height: "auto",
          }}
        >
          <Flex align={"center"} gap="1em">
            {avatar}
            {/* {isVoxMode ? undefined : (
              <AudioContextVisualization
                sourceId={aiCharacter?.id}
                key={aiCharacter?.id}
                color={audioVisualizationColor}
                audioContext={ttsAudioContext}
                getSource={() => getTtsState().currentSource}
                style={{
                  filter: "blur(3em)",
                  width: "30vw",
                  height: "1em",
                }}
              />
            )} */}
          </Flex>
        </Flex>

        <AnimatePresence>
          {ttsSpeaking ? (
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
              key={`${chat.id}-${ttsSpeaking}-motion`}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "absolute",
                bottom: "8em",
                width: "100%",
                pointerEvents: "none",
              }}
            >
              <Flex align={"baseline"}>
                <AudioContextVisualization
                  // TODO how to get TTS audio context using react state?
                  // audioContext={audioPlayer.getAudioContext()}
                  audioContext={ttsAudioContext}
                  color={audioVisualizationColor}
                  getSource={() => getTtsState().currentSource}
                  key={`${chat.id}-tts-visualization-${ttsSpeaking}`}
                  style={{
                    // height: "5em",
                    filter: "blur(3em)",
                    height: "80vh",
                    width: "80vw",
                    pointerEvents: "none",
                  }}
                />
              </Flex>
            </motion.div>
          ) : undefined}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* {isVoxMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              style={{ flexGrow: 1, height: "auto", width: "100%" }}
              key="vox-active-motion"
            >
              <OrbVisualizer />
            </motion.div>
          ) : ( */}
          <ChatDisplay
            style={{
              height: "10em", // TODO why?
              width: "100%",
            }}
            messages={messages}
            enableControls={enableControls}
            characters={characters}
            chat={chat}
          />
          {/* )} */}
        </AnimatePresence>
        <ChatTextEntry chat={chat} />
      </Flex>
    );
  },
  stringifyEq
);
