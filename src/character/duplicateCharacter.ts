import { uniqueId } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { DatasState } from "../state/data/DatasState";
import { getUserState } from "../state/user/UserState";
import { getCharacter } from "./getCharacter";
import { switchActiveGroup } from "../state/user/switchActiveGroup";
import { getActiveGroup } from "../state/user/getActiveGroup";
import { isDefined } from "@mjtdev/engine";

export const duplicateCharacter = async (id: string) => {
  const character = await getCharacter(id);
  if (!character) {
    return;
  }
  const { imageDataId } = character;
  const imgBlob = await DatasState.dataIdToBlob(imageDataId);
  const dupImageDataId = imgBlob ? uniqueId("data") : undefined;

  if (dupImageDataId && imgBlob) {
    await DatasState.putBlob({ id: dupImageDataId, blob: imgBlob });
  }

  const char = DataObjectStates.upsertDataObject({
    objectType: "app-character",
    draft: {
      ...character,
      id: uniqueId("app-character"),
      imageDataId: dupImageDataId,
    },
    parentId: getUserState().id,
  });
  const { id: userId } = getUserState();
  if (isDefined(userId)) {
    const userActiveGroup = await getActiveGroup(userId);
    switchActiveGroup({
      subjectId: char.id,
      activeId: userActiveGroup.id,
    });
  }
};
