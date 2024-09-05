import { Reacts, isDefined } from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import { Asrs, type Chat } from "ai-worker-common";
import { IoHandRightOutline } from "react-icons/io5";
import { PiEar } from "react-icons/pi";
import { RiSpeakLine } from "react-icons/ri";
import { startCustomAsr } from "../../../asr-custom/startCustomAsr";
import { stopVadAsr } from "../../../asr-custom/stopVadAsr";
import { useCustomAsrState } from "../../../asr-custom/updateCustomAsrState";
import { useAppState } from "../../../state/app/AppState";
import { SuggestedEntriesButton } from "../suggest/SuggestedEntriesButton";
import { GenerateButton } from "./GenerateButton";
import { abortGeneration } from "./abortGeneration";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { IoOptions } from "react-icons/io5";
import { formatAndCapitalize } from "../../../common/formatAndCapitalize";
import { APP_LOCATION_MODES } from "../../../state/location/APP_LOCATION_MODES";
import type { AppMode } from "../../../state/location/AppLocationState";
import { useAppModesAndParams } from "../../../state/location/useAppModesAndParams";
import { addAppMode } from "../../../state/location/addAppMode";
import { removeAppMode } from "../../../state/location/removeAppMode";
import { AppIconButton } from "../../common/AppIconButton";
import { AppToggleButton } from "../../common/AppToggleButton";

import { AiOutlineDatabase } from "react-icons/ai";
import { GrInspect } from "react-icons/gr";
import { IoIosConstruct } from "react-icons/io";
import { IoAccessibilitySharp } from "react-icons/io5";
import { TbLambda } from "react-icons/tb";
import { VscDebug } from "react-icons/vsc";
import { RiVoiceprintFill } from "react-icons/ri";
import { AsrCustoms } from "../../../asr-custom/AsrCustoms";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useIsTtsSpeaking } from "../../../tts/useIsTtsSpeaking";
import { Ttss } from "../../../tts/Ttss";
import { interruptTts } from "../../../tts/custom/interruptTts";

const APP_MODE_TO_ICON: Record<AppMode, ReactNode> = {
  pap: <IoAccessibilitySharp />,
  dev: <TbLambda />,
  doc: <AiOutlineDatabase />,
  inspect: <GrInspect />,
  create: <IoIosConstruct />,
  debug: <VscDebug />,
  vox: <RiVoiceprintFill />,
  monitor: undefined,
  block: <HiOutlineSquares2X2 />,
  overlay: undefined,
};

export const AdvancedChatEntryControls = ({
  chat,
  buttonState,
  text,
  onGenerate = () => {},
}: {
  onGenerate: () => void;
  buttonState: "Generate" | "Abort";
  text: string;
  chat: Chat;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { ttsEnabled } = useAppState();
  const { vad, speaking: asrSpeaking, muffled } = useCustomAsrState();
  const ttsSpeaking = useIsTtsSpeaking();
  const { modes } = useAppModesAndParams();

  Reacts.useKeyboardListener({
    ESCAPE: abortGeneration,
  });

  const modeButtons = APP_LOCATION_MODES.map((mode, i) => (
    <AppToggleButton
      key={i}
      enabled={modes.includes(mode)}
      variant="outline"
      icon={APP_MODE_TO_ICON[mode]}
      enabledOptions={{
        tooltip: formatAndCapitalize(`Disable ${mode} Mode`),
        color: "green",
        onClick: () => {
          removeAppMode(mode);
        },
      }}
      disabledOptions={{
        tooltip: formatAndCapitalize(`Enable ${mode} Mode`),
        onClick: () => {
          addAppMode(mode);
        },
      }}
    />
  ));

  return (
    <Flex wrap="wrap" align={"center"}>
      <GenerateButton
        onGenerate={() => onGenerate()}
        buttonState={buttonState}
        chat={chat}
        text={text}
      />
      <SuggestedEntriesButton chat={chat} />
      <AppIconButton
        tooltip="Interrupt"
        color={ttsSpeaking ? "yellow" : undefined}
        variant="outline"
        onClick={() => {
          interruptTts("interrupt button clicked");
        }}
      >
        <IoHandRightOutline />
      </AppIconButton>

      <AppToggleButton
        variant="outline"
        enabled={ttsEnabled}
        enabledOptions={{
          tooltip: "Disable TTS",
          color: "green",
          onClick: () => {
            interruptTts("disable button clicked");
            Ttss.toggleTts();
          },
        }}
        disabledOptions={{
          tooltip: "Enable TTS",
          onClick: () => {
            Ttss.toggleTts();
          },
        }}
        icon={<RiSpeakLine />}
      />

      <AppToggleButton
        variant="outline"
        enabled={isDefined(vad)}
        onPointerOver={() => {
          AsrCustoms.muffleCustomAsr();
        }}
        onPointerLeave={() => {
          AsrCustoms.unmuffleCustomAsr();
        }}
        enabledOptions={{
          tooltip: muffled ? "ASR Muffled" : "Disable ASR",
          color: asrSpeaking ? "amber" : muffled ? "orange" : "green",
          onClick: () => {
            stopVadAsr();
          },
        }}
        disabledOptions={{
          tooltip: "Enable ASR",
          onClick: () => {
            startCustomAsr();
          },
        }}
        icon={<PiEar />}
      />
      <AnimatePresence mode="wait">
        <AppIconButton
          color={showOptions ? "green" : undefined}
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          variant="outline"
          tooltip={showOptions ? "Hide Options" : "Show Options"}
        >
          <IoOptions />
        </AppIconButton>
        {showOptions ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="options-motion"
          >
            <Flex gap="1" wrap="wrap">
              {modeButtons}
            </Flex>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </Flex>
  );
};
