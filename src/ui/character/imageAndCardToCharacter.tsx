import { DatasState } from "../../state/data/DatasState";
import type { TavernCardV2 } from "ai-worker-common";
import { Apps, uniqueId } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { isDefined } from "@mjtdev/engine";
import { getActiveGroup } from "../../state/user/getActiveGroup";
import { switchActiveGroup } from "../../state/user/switchActiveGroup";

export const imageAndCardToCharacter = async ({
  image,
  card,
}: {
  image: Blob;
  card: TavernCardV2;
}) => {
  const imageDataId = uniqueId("data");
  const putBlobResp = await DatasState.putBlob({
    id: imageDataId,
    blob: image,
  });
  if (!putBlobResp.ok) {
    Apps.error(putBlobResp);
    return;
  }
  const char = DataObjectStates.upsertDataObject({
    objectType: "app-character",
    draft: { card, imageDataId },
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
