import {
  type ByteLike,
  isUndefined,
  BrowserFiles,
  Bytes,
  isDefined,
  Dropzone,
} from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import type { AppMessageMap } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { stitchAudioArrayBuffers } from "../../audio/stitchAudioArrayBuffers";
import { AppEvents } from "../../event/AppEvents";
import { Returns } from "../../state/data-object/Returns";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { toast } from "../../tts/custom/toast";
import { Ttss } from "../../tts/Ttss";
import { VideoPlayer } from "../character/VideoPlayer";
import { directTextToAudio } from "../chat/mind/directTextToAudio";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppTextArea } from "../common/AppTextArea";
import { Waitable } from "../image/Waitable";
import { WaveformDisplay } from "../voice/WaveformDisplay";

export const VideoEditor = ({
  video,
  image,
  onChangeVideo: onChangeVideo,
  defaultText,
  characterId,
}: {
  characterId: string;
  defaultText?: string;
  video?: ByteLike;
  image?: ByteLike;
  onChangeVideo: (voiceSample: ByteLike | undefined) => void;
}) => {
  const [state, setState] = useState(
    Object.freeze({
      text: defaultText,
      generating: false as boolean,
      stitched: undefined as undefined | ArrayBuffer,
    })
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
        <Waitable waiting={state.generating}>
          <VideoPlayer placeholder={image} controls={true} video={video} />
        </Waitable>
        <Flex align={"center"}>
          <Flex direction={"column"} gap="2">
            <AppTextArea
              onChange={(value) => {
                setState(
                  produce(state, (s) => {
                    s.text = value;
                  })
                );
              }}
              defaultValue={defaultText}
              placeholder={"video text"}
            />
            <WaveformDisplay
              style={{ maxHeight: "2em" }}
              audio={state.stitched}
            />

            <AppButtonGroup
              colors={{
                deleteVideo: "red",
                generateVideo: "green",
              }}
              disableds={{ generateGreetingVideo: isUndefined(state.stitched) }}
              actions={{
                // deleteVideo: () => {
                //   onChangeVideo(undefined);
                // },
                generateAudio: async () => {
                  setState(
                    produce(state, (s) => {
                      s.generating = true;
                    })
                  );
                  Ttss.enableTts();
                  const clips = await directTextToAudio({
                    text: state.text?.trim() ?? "hello",
                    characterId,
                  });
                  const stitched = await stitchAudioArrayBuffers(clips);
                  console.log("stitched", { stitched, clips });

                  BrowserFiles.writeFileBrowser(
                    `${characterId}-greeting-audio.wav`,
                    stitched
                  );
                  setState(
                    produce(state, (s) => {
                      // s.clips = clips
                      s.stitched = stitched;
                    })
                  );
                },
                generateVideo: async () => {
                  if (isUndefined(image)) {
                    AppEvents.dispatchEvent("error", new Error("No image"));
                    return;
                  }
                  const ab = await Bytes.toArrayBuffer(image);
                  const returnId = Returns.addReturnListener<
                    AppMessageMap["lipsync:response"]
                  >({
                    stream: true,
                    onTimeout: () => {
                      AppEvents.dispatchEvent(
                        "error",
                        new Error("Timeout generating video", {
                          cause: characterId,
                        })
                      );
                      setState(
                        produce(state, (s) => {
                          s.generating = false;
                        })
                      );
                    },
                    maxWaitMs: 10 * 60 * 1000,
                    onReturn: (data) => {
                      console.log("lipsync resp data", data);
                      const { out, err, video } = data;
                      if (isDefined(out)) {
                        // AppEvents.dispatchEvent("toast", out);
                      }
                      if (isDefined(err)) {
                        console.error(err);
                        // AppEvents.dispatchEvent("toast", err);
                      }
                      if (isDefined(video)) {
                        setState(
                          produce(state, (s) => {
                            s.generating = false;
                          })
                        );
                        BrowserFiles.writeFileBrowser(
                          `${characterId}-greeting.mp4`,
                          video
                        );
                        onChangeVideo(data.video);
                      }
                    },
                  });
                  setState(
                    produce(state, (s) => {
                      s.generating = true;
                    })
                  );
                  if (isUndefined(state.stitched)) {
                    toast("No audio so refusing to generate video");
                    return;
                  }

                  AppMessagesState.dispatch({
                    type: "lipsync:request",
                    detail: {
                      audio: state.stitched,
                      image: ab,
                      returnId,
                    },
                  });
                },
              }}
            />
            <Dropzone
              iconSize="4em"
              iconCode="file_upload"
              inactiveText={`${video ? "Replace" : "Add"} Video`}
              action={async (files: File[]): Promise<void> => {
                if (!files || files.length < 1) {
                  return;
                }
                const ab = await files[0].arrayBuffer();
                onChangeVideo(ab.slice(0));
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
