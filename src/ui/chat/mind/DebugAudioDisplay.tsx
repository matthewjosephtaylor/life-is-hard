import { BrowserFiles, createState } from "@mjtdev/engine";
import { Flex, Text } from "@radix-ui/themes";
import { AppEvents } from "../../../event/AppEvents";
import { audioPlayer } from "../../../audio/AudioClipPlayer";
import { AppButtonGroup } from "../../common/AppButtonGroup";
import { WaveformDisplay } from "../../voice/WaveformDisplay";
import { directAudioToText } from "./directAudioToText";
import { stitchAudioArrayBuffers } from "../../../audio/stitchAudioArrayBuffers";

// const [useDebugState, updateDebugState, getDebugState] = createState({
//   performanceItems: [] as AppMessageMap["app:performance"][],
// });

const [useState, updateState, getState] = createState({
  clips: [] as ArrayBuffer[],
  texts: [] as string[],
});
export const DebugAudioDisplay = () => {
  const { clips, texts } = useState();
  AppEvents.useEventListener("asrAudioWav", (evt) => {
    updateState((s) => {
      s.clips.push(evt.detail.slice(0));
    });
  });
  AppEvents.useEventListener("ttsAudioWav", (evt) => {
    updateState((s) => {
      s.clips.push(evt.detail.slice(0));
    });
  });
  return (
    <Flex
      flexGrow={"1"}
      style={{ width: "100%", maxHeight: "50%", overflow: "auto" }}
      gap="1"
      direction={"column"}
    >
      <Flex gap="2">
        <AppButtonGroup
          actions={{
            stitch: async () => {
              const { clips } = getState();
              console.log(clips);
              const stitched = await stitchAudioArrayBuffers(clips);
              console.log(stitched);
              updateState((s) => {
                s.clips.push(stitched);
              });
            },
            clearMicClips: () => {
              updateState((s) => {
                s.clips.length = 0;
              });
            },
          }}
        />
      </Flex>
      {clips.map((clip, i) => (
        <Flex style={{ width: "100%" }} gap="1" key={i}>
          <AppButtonGroup
            actions={{
              play: async () => {
                audioPlayer.enqueueAudioClip(clip.slice(0));
              },
              download: () => {
                BrowserFiles.writeFileBrowser("audio.wav", clip);
              },
              asr: async () => {
                const text = await directAudioToText(clip);
                updateState((s) => {
                  s.texts[i] = text;
                });
              },
            }}
          />
          <WaveformDisplay style={{ maxHeight: "2em" }} audio={clip} />
          <Text>{texts[i]}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
