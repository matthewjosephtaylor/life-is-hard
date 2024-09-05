import { waitTimeout } from "@mjtdev/engine";
import { AppEvents } from "../event/AppEvents";
import { addGroupToUserIfNotExist } from "./addGroupToUserIfNotExist";
import { duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter } from "./duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter";

export const performClientMigrations = async () => {
  console.log("performClientMigrations: start");
  await waitTimeout(2 * 1000); // wait for App to render
  await addGroupToUserIfNotExist();
  await duplicateCharactersAndDeleteOldIfNoGroupsOnCharacter();
  console.log("performClientMigrations: end");
};
