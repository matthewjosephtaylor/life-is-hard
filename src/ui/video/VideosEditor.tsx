import type { ByteLike } from "@mjtdev/engine";
import { isDefined, isEmpty, isNotEmpty, isUndefined } from "@mjtdev/engine";
import { Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppDropDown } from "../common/AppDropDown";
import { openFormEditorPopup } from "../form/openFormEditorPopup";
import { VideoEditor } from "./VideoEditor";
import { produce } from "immer";

export const VideosEditor = ({
  videos = {},
  image,
  onChangeVideos: onChangeVideo,
  defaultText,
  characterId,
  defaultVideoName = "greeting",
}: {
  characterId: string;
  defaultText?: string;
  defaultVideoName?: string;
  videos?: Record<string, ByteLike | undefined>;
  image?: ByteLike;
  onChangeVideos: (videos: Record<string, ByteLike | undefined>) => void;
}) => {
  const [state, setState] = useState({
    selectedVideo: Object.keys(videos)[0] ?? defaultVideoName,
  });
  return (
    <Flex gap="2" direction={"column"}>
      <Flex align={"center"}>
        <AppDropDown
          title="selected video"
          placeholder={state.selectedVideo}
          values={Object.keys(videos)}
          onChange={(selectedVideo) => {
            setState({ selectedVideo });
          }}
        />
        <AppButtonGroup
          colors={{
            deleteVideo: "red",
            addNewVideo: "green",
            renameVideo: "orange",
          }}
          actions={{
            deleteVideo: async () => {
              const updated = produce(videos, (s) => {
                delete s[state.selectedVideo];
              });
              onChangeVideo(updated);
              // onChangeVideo({
              //   ...videos,
              //   [state.selectedVideo]: undefined,
              // });
              setState({ selectedVideo: defaultVideoName });
            },
            renameVideo: async () => {
              const form = await openFormEditorPopup(
                {
                  name: "",
                },
                { title: "Video", fieldStyles: { name: { width: "20ch" } } }
              );
              if (isUndefined(form)) {
                return;
              }
              const { name } = form;
              if (isEmpty(name)) {
                return;
              }
              const updated = produce(videos, (s) => {
                const prev = s[state.selectedVideo];
                delete s[state.selectedVideo];
                s[name] = prev;
              });
              onChangeVideo(updated);
              setState({ selectedVideo: name });
            },
            addNewVideo: async () => {
              const form = await openFormEditorPopup(
                {
                  name: "",
                },
                { title: "Video", fieldStyles: { name: { width: "20ch" } } }
              );
              if (isUndefined(form)) {
                return;
              }
              const { name } = form;
              if (isEmpty(name)) {
                return;
              }
              console.log("name", name);
              onChangeVideo({
                ...videos,
                [name]: undefined,
              });
              setState({ selectedVideo: name });
            },
          }}
        />
      </Flex>
      <Separator size="4" orientation="horizontal" />
      {isNotEmpty(state.selectedVideo) && (
        <VideoEditor
          characterId={characterId}
          defaultText={defaultText}
          video={videos[state.selectedVideo]}
          image={image}
          onChangeVideo={(video) => {
            onChangeVideo({
              ...videos,
              [state.selectedVideo]: video,
            });
          }}
        />
      )}
    </Flex>
  );
};
