import { Flex } from "@radix-ui/themes";
import type { AppCharacter, Chat } from "ai-worker-common";
import { FaKeyboard, FaMicrophoneAlt } from "react-icons/fa";
import { useCustomAsrState } from "../../../asr-custom/updateCustomAsrState";
import { useAppState } from "../../../state/app/AppState";
import { AppIconButton } from "../../common/AppIconButton";

import type { CSSProperties } from "react";
import { PiSpeakerHighFill } from "react-icons/pi";
import { AsrCustoms } from "../../../asr-custom/AsrCustoms";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AppModes } from "../../../state/location/AppModes";
import { GenerateButton } from "./GenerateButton";
import { useIsTtsSpeaking } from "../../../tts/useIsTtsSpeaking";
import { interruptTts } from "../../../tts/custom/interruptTts";
import { Ttss } from "../../../tts/Ttss";
import { SuggestedEntriesButton } from "../suggest/SuggestedEntriesButton";

export const BasicChatEntryControls = ({
  chat,
  text,
  onGenerate,
}: {
  chat: Chat;
  text: string;

  onGenerate: () => void;
}) => {
  const { enabled: asrEnabled, speaking: asrSpeaking } = useCustomAsrState();
  const { ttsEnabled } = useAppState();
  const ttsSpeaking = useIsTtsSpeaking();
  const { modes } = AppModes.useAppModesAndParams();
  const isVoxMode = modes.includes("vox");
  const assistantCharacter = DataObjectStates.useDataObject<AppCharacter>(
    chat.aiCharacterId
  );

  // const enabled = asrEnabled || ttsEnabled;

  const assistantName = assistantCharacter?.card.data.name ?? "Agent";

  const buttonStyle: CSSProperties = { height: "3em", width: "3em" };
  const iconStyle: CSSProperties = { height: "2em", width: "2em" };

  return (
    <Flex wrap="wrap" gap="4" align={"center"}>
      <GenerateButton
        onGenerate={() => onGenerate()}
        buttonState={"Generate"}
        chat={chat}
        text={text}
        buttonStyle={buttonStyle}
        iconStyle={iconStyle}
      />
      <AppIconButton
        size={"4"}
        color={asrEnabled ? (asrSpeaking ? "amber" : "green") : "gray"}
        style={buttonStyle}
        variant="outline"
        tooltip={
          asrEnabled
            ? `Stop ${assistantName} from listening`
            : `Allow  ${assistantName} to listen`
        }
        onClick={async () => {
          interruptTts();
          if (asrEnabled) {
            // await Ttss.disableTts();
            await AsrCustoms.stopVadAsr();
            return;
          }
          // await Ttss.enableTts();
          await AsrCustoms.startCustomAsr();
        }}
      >
        <FaMicrophoneAlt style={iconStyle} />
      </AppIconButton>
      <AppIconButton
        color={ttsEnabled ? (ttsSpeaking ? "amber" : "green") : "gray"}
        style={buttonStyle}
        variant="outline"
        tooltip={
          ttsEnabled
            ? `Stop ${assistantName} from talking`
            : `Allow  ${assistantName} to talk `
        }
        onClick={async () => {
          interruptTts();
          if (ttsEnabled) {
            await Ttss.disableTts();
            // await AsrMedias.stopCustomAsr();
            return;
          }
          await Ttss.enableTts();
          // await AsrMedias.startCustomAsr();
        }}
      >
        <PiSpeakerHighFill style={iconStyle} />
      </AppIconButton>
      <AppIconButton
        size={"4"}
        color={isVoxMode ? "gray" : "green"}
        style={buttonStyle}
        variant="outline"
        tooltip={
          isVoxMode ? `Show keyboard interface` : `Hide keyboard interface`
        }
        onClick={async () => {
          isVoxMode
            ? AppModes.removeAppMode("vox")
            : AppModes.addAppMode("vox");
        }}
      >
        <FaKeyboard style={iconStyle} />
      </AppIconButton>

      <SuggestedEntriesButton
        buttonStyle={buttonStyle}
        iconStyle={iconStyle}
        chat={chat}
      />
    </Flex>
  );
};
