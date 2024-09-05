import { isDefined, isUndefined } from "@mjtdev/engine";
import { getUserState } from "../state/user/UserState";
import { getActiveGroup } from "../state/user/getActiveGroup";
import { createAppGroup } from "../ui/user/createAppGroup";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import type { AppUser } from "ai-worker-common";
import { switchActiveGroup } from "../state/user/switchActiveGroup";

export const addGroupToUserIfNotExist = async () => {
  // console.log("addGroupToUserIfNotExist: start");
  const { id: userId } = getUserState();
  if (!userId) {
    // console.log("addGroupToUserIfNotExist: refusing, no userId");
    return;
  }
  const activeGroup = await getActiveGroup(userId);
  if (isDefined(activeGroup)) {
    // console.log(
    //   "addGroupToUserIfNotExist: refusing, user active group exists",
    //   activeGroup
    // );
  }

  const user = await DataObjectStates.getDataObject<AppUser>(userId);
  if (isUndefined(user)) {
    // console.log("addGroupToUserIfNotExist: refusing, no user", user);
    return;
  }
  const userName = user.publicName ?? user.userName;
  const nonActiveGroups = await DataObjectStates.getChildDataObjects(
    user.id,
    "app-group"
  );
  const activeGroups = await DataObjectStates.getChildDataObjects(
    user.id,
    "app-group",
    "active"
  );
  const groups = [...nonActiveGroups, ...activeGroups];
  if (groups.length > 0) {
    // console.log(
    //   "addGroupToUserIfNotExist: refusing, groups already exist for user",
    //   { user, groups }
    // );
    return;
  }
  // console.log(`addGroupToUserIfNotExist: userName: ${userName}`, {
  //   nonActiveGroups,
  //   activeGroups,
  // });
  const groupName = `${userName}'s Group`;
  // console.log(`addGroupToUserIfNotExist: groupName: ${groupName}`);
  const createdGroup = await createAppGroup({ name: groupName });
  // console.log("addGroupToUserIfNotExist: activating", createdGroup);
  await switchActiveGroup({ subjectId: user.id, activeId: createdGroup.id });

  // console.log("addGroupToUserIfNotExist: end");
};
