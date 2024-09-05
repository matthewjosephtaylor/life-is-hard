import { Bytes, isDefined } from "@mjtdev/engine";
import type { AppCharacter, DecomposedAppCharacter } from "ai-worker-common";
import { AppImages, uniqueId } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { DatasState } from "../../state/data/DatasState";
import { getUserState } from "../../state/user/UserState";
import { switchActiveGroup } from "../../state/user/switchActiveGroup";
import { AppMessagesState } from "../../state/ws/AppMessagesState";

export const updateAppCharacter = async (
  decomposedAppCharacter: DecomposedAppCharacter | undefined
) => {
  if (!decomposedAppCharacter) {
    return;
  }

  const { id: userId } = getUserState();
  if (!userId) {
    return AppEvents.dispatchEvent(
      "error",
      "openCharacterEditor: missing userId"
    );
  }

  const imageDataId = uniqueId("data");

  const imagedCharacter: AppCharacter = {
    ...decomposedAppCharacter.character,
    imageDataId,
  };

  console.log("updateAppCharacter videos", decomposedAppCharacter.videos);
  const imageBlob = await AppImages.decomposedAppCharacterToPng({
    character: imagedCharacter,
    image: decomposedAppCharacter.image,
    voiceSample: decomposedAppCharacter.voiceSample,
    activeGroupId: decomposedAppCharacter.activeGroupId,
    videos: decomposedAppCharacter.videos,
  });

  await DatasState.putBlob({
    blob: imageBlob,
    id: imageDataId,
  });

  console.log(
    `updateAppCharacter: updating character: ${imagedCharacter.id}`,
    imagedCharacter
  );
  DataObjectStates.upsertDataObject({
    objectType: "app-character",
    parentId: userId,
    draft: imagedCharacter,
  });

  if (isDefined(decomposedAppCharacter.activeGroupId)) {
    await switchActiveGroup({
      subjectId: imagedCharacter.id,
      activeId: decomposedAppCharacter.activeGroupId,
    });
  }

  // delete others
  // const { videos = {} } = decomposedAppCharacter;
  // const greetingVideo = videos["greeting"];
  // if (isDefined(greetingVideo)) {
  //   console.log("saving greeting video");
  //   const others = await DataObjectStates.getChildDataObjects(
  //     decomposedAppCharacter.character.id,
  //     "app-video",
  //     "greeting"
  //   );

  //   others.forEach((other) => {
  //     DatasState.deleteDataId(other.dataId);
  //     DataObjectStates.deleteDataObject(other.id);
  //   });
  //   const dataId = uniqueId("data");
  //   const blob = Bytes.toBlob(greetingVideo, "video/mp4");
  //   await DatasState.putBlob({ id: dataId, blob });
  //   DataObjectStates.upsertDataObject({
  //     draft: { dataId },
  //     objectType: "app-video",
  //     parentId: decomposedAppCharacter.character.id,
  //     key: "greeting",
  //   });
  // } else {
  //   const vids = await DataObjectStates.getChildDataObjects(
  //     decomposedAppCharacter.character.id,
  //     "app-video",
  //     "greeting"
  //   );
  //   console.log("deleting vids from character", vids);
  //   for (const vid of vids) {
  //     console.log("deleting vid from character", vid);
  //     await DatasState.deleteDataId(vid.dataId);
  //     await DataObjectStates.deleteDataObject(vid.id);
  //   }
  // }

  // TODO HACK invalidating worker caches on character access update
  AppMessagesState.dispatch({
    type: "app:invalidateCaches",
    detail: undefined,
  });
};
