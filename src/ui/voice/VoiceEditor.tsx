import type { ByteLike } from "@mjtdev/engine";
import { BrowserFiles, Bytes, Dropzone, Images, Strings } from "@mjtdev/engine";
import { Card, Flex, Separator, Strong } from "@radix-ui/themes";
import type {
  AppCharacter,
  AppCharacterVoice,
  AppUser,
  CustomVoiceStyle,
} from "ai-worker-common";
import { AppImages, uniqueId } from "ai-worker-common";
import { FaMicrophoneAlt } from "react-icons/fa";
import { AsrCustoms } from "../../asr-custom/AsrCustoms";
import { useCustomAsrState } from "../../asr-custom/updateCustomAsrState";
import { AppEvents } from "../../event/AppEvents";
import { DatasState } from "../../state/data/DatasState";
import { getUserState } from "../../state/user/UserState";
import { useIsUserGroup } from "../../state/user/useIsUserGroup";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { Ttss } from "../../tts/Ttss";
import { audioPlayer } from "../../audio/AudioClipPlayer";
import { DEFAULT_CHAR_URL } from "../DEFAULT_CHAR_URL";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppIconButton } from "../common/AppIconButton";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { FormFields } from "../user/FormFields";
import { WaveformDisplay } from "./WaveformDisplay";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";

export const VoiceEditor = ({
  character,
  voiceSample,
  onChangeCharacter,
  onChangeVoiceSample,
}: {
  character: AppCharacter;
  voiceSample?: ByteLike;
  onChangeCharacter: (character: Partial<AppCharacterVoice>) => void;
  onChangeVoiceSample: (voiceSample: ByteLike | undefined) => void;
}) => {
  const { enabled: asrEnabled, speaking: asrSpeaking } = useCustomAsrState();
  // const isOpenBetaUser = false;

  const sampleDisplay = voiceSample ? (
    <Card>
      <Strong>Audio Sample</Strong>
      <Flex align={"center"} direction={"column"}>
        <WaveformDisplay audio={voiceSample} />
        <AppButtonGroup
          colors={{ delete: "red" }}
          actions={{
            delete: () => {
              onChangeVoiceSample(undefined);
            },
            playSample: async () => {
              if (!voiceSample) {
                return AppEvents.dispatchEvent("toast", "No sample");
              }
              const ab = await Bytes.toArrayBuffer(voiceSample);
              console.log("enqueueAudioClip", ab);
              // audioPlayer.start()

              audioPlayer.enqueueAudioClip(ab.slice(0));
            },
            download: async () => {
              const ab = await Bytes.toArrayBuffer(voiceSample);
              BrowserFiles.writeFileBrowser(
                `${character.card.data.name ?? ""}-voice.wav`,
                ab
              );
            },
            testVoice: async () => {
              await Ttss.enableTts();
              const user = await DataObjectStates.getDataObject<AppUser>(
                getUserState().id
              );
              // create a 'fake character' that has the voice-sample
              const fakeImage = await Images.toBlob(DEFAULT_CHAR_URL);

              const idRaw = await Bytes.hashOf({ bytes: voiceSample });
              const contentAddress = await Bytes.encodeAsString(idRaw, 16);
              const imageDataId = uniqueId(
                "data",
                [
                  contentAddress,
                  Strings.hashFnv32a({ str: JSON.stringify(user) }),
                ].join("-")
              );
              const fakeCharacter = { ...character, imageDataId };
              const png = await AppImages.decomposedAppCharacterToPng({
                character: fakeCharacter,
                image: fakeImage,
                voiceSample,
              });
              // TODO it might be nice to clean voice sample image up after...
              await DatasState.putBlob({
                blob: png,
                id: imageDataId,
              });
              await AppMessagesState.dispatch({
                type: "tts:say",
                detail: {
                  text: `Hello, I am ${
                    character.card.data.name
                  }. My creator is ${
                    user?.publicName ?? user?.userName ?? "unknown"
                  }. What can I do for you today?`,
                  character: fakeCharacter,
                },
              });
            },
            cancel: async () => {
              audioPlayer.interrupt();
            },
          }}
        />
      </Flex>
    </Card>
  ) : undefined;

  const style = (
    <Card>
      <Flex direction="column" gap="2">
        <Strong>Style</Strong>
        <Flex
          style={{ maxHeight: "5em", overflow: "auto" }}
          wrap="wrap"
          gap="2"
        >
          <FormFields
            defaultValue={
              {
                alpha: 0.05,
                beta: 0.95,
                sampleRate: 24_000,
                scale: 1,
                steps: 100,
                ...(character.card.data.extensions?.voice?.style ?? {}),
              } satisfies CustomVoiceStyle
            }
            formFieldTypeMap={{
              alpha: "number",
              beta: "number",
              sampleRate: "number",
              scale: "number",
              steps: "number",
            }}
            keys={["sampleRate", "steps", "alpha", "beta", "scale"]}
            onChange={(key, value): void => {
              onChangeCharacter({
                ...(character.card.data.extensions?.voice ?? {}),
                style: {
                  ...(character.card.data.extensions?.voice?.style ?? {}),
                  [key]: value,
                },
              });
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );

  return (
    <Flex
      style={{ marginTop: "2em", width: "100%" }}
      gap="2"
      flexGrow="1"
      align={"center"}
    >
      <Flex
        style={{ width: "100%" }}
        direction={"column"}
        gap="2"
        align="center"
      >
        {sampleDisplay}
        <Flex align={"center"}>
          <Flex gap="9">
            <Dropzone
              iconSize="4em"
              iconCode="file_upload"
              inactiveText={`${voiceSample ? "Replace" : "Add"} Voice Sample`}
              action={async (files: File[]): Promise<void> => {
                if (!files || files.length < 1) {
                  return;
                }
                const ab = await files[0].arrayBuffer();
                onChangeVoiceSample(ab.slice(0));
              }}
            />
            <Separator orientation="vertical" style={{ height: "5em" }} />
            <AppIconButton
              size={"4"}
              color={asrEnabled ? (asrSpeaking ? "amber" : "green") : "gray"}
              style={{ height: "5em", width: "5em" }}
              variant="outline"
              tooltip="Click to record voice sample"
              onClick={async () => {
                await AsrCustoms.startCustomAsr();
                AppEvents.once("asrAudioWav", (evt) => {
                  AsrCustoms.stopVadAsr();
                  onChangeVoiceSample(evt.detail);
                  return;
                });
              }}
            >
              <FaMicrophoneAlt
                style={{
                  height: "4em",
                  width: "4em",
                }}
              />
            </AppIconButton>
          </Flex>
        </Flex>
        {style}
      </Flex>

      <Separator orientation="vertical" style={{ height: "20em" }} />
      <FormInputDisplay
        title={"ElevenLabs Voice ID"}
        defaultValue={character.card.data.extensions?.voice?.elevenLabsVoiceId}
        onChange={(value) => {
          onChangeCharacter({
            ...(character.card.data.extensions?.voice ?? {}),
            elevenLabsVoiceId: value,
          });
        }}
      />
    </Flex>
  );
};
