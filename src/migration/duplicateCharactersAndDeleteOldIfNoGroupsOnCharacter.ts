import { isUndefined } from "@mjtdev/engine";
import { duplicateCharacter } from "../character/duplicateCharacter";
import { AppEvents } from "../event/AppEvents";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { getUserState } from "../state/user/UserState";
import { getActiveGroup } from "../state/user/getActiveGroup";
import { switchActiveGroup } from "../state/user/switchActiveGroup";

export const duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter =
  async () => {
    // console.log("duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter: start");
    const { id: userId } = getUserState();
    if (isUndefined(userId)) {
      return;
    }
    const characters = await DataObjectStates.getChildDataObjects(
      userId,
      "app-character"
    );
    // console.log(
    //   "duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter: characters",
    //   characters
    // );
    const userActiveGroup = await getActiveGroup(userId);
    if (isUndefined(userActiveGroup)) {
      // console.log(
      //   `duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter: refusing, no active group for ${userId}`
      // );
      return;
    }

    for (const character of characters) {
      await recreateCharacterIfNoGroups({
        characterId: character.id,
        activeGroupId: userActiveGroup.id,
      });
    }

    // console.log("duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter: end");
  };

export const recreateCharacterIfNoGroups = async ({
  characterId,
  activeGroupId,
}: {
  characterId: string;
  activeGroupId: string;
}) => {
  const nonActiveGroups = await DataObjectStates.getChildDataObjects(
    characterId,
    "app-group"
  );
  const activeGroups = await DataObjectStates.getChildDataObjects(
    characterId,
    "app-group",
    "active"
  );
  const groups = [...nonActiveGroups, ...activeGroups];
  // console.log(
  //   `recreateCharacterIfNoGroups: groups for: ${characterId} `,
  //   groups
  // );
  if (groups.length > 0) {
    // console.log(
    //   `recreateCharacterIfNoGroups: refusing to recreate, groups exist for: ${characterId} `,
    //   groups
    // );
    return;
  }

  AppEvents.dispatchEvent(
    "toast",
    `Recreating character: ${characterId} to add active group`
  );

  const duplicate = await duplicateCharacter(characterId);
  if (isUndefined(duplicate)) {
    console.warn(
      `recreateCharacterIfNoGroups: unable to duplicate: ${characterId}`
    );
    return;
  }
  // console.log("recreateCharacterIfNoGroups: duplicate", duplicate);
  // console.log(
  //   `recreateCharacterIfNoGroups: deleting old character: ${characterId}`
  // );
  // console.log(
  //   `recreateCharacterIfNoGroups: switching active group for: ${duplicate.id}`,
  //   activeGroupId
  // );
  await switchActiveGroup({
    activeId: activeGroupId,
    // groupIds: [],
    subjectId: duplicate.id,
  });
  const afterGroups = await DataObjectStates.getChildDataObjects(
    duplicate.id,
    "app-group"
  );
  // console.log("recreateCharacterIfNoGroups: afterGroups", afterGroups);
  DataObjectStates.deleteDataObject(characterId);
  // console.log("recreateCharacterIfNoGroups: end");
};
