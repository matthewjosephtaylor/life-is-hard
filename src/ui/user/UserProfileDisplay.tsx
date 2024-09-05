import { Card, Flex, Text } from "@radix-ui/themes";
import type { AppUserProfile} from "ai-worker-common";
import { UserProfiles } from "ai-worker-common";
import { useDataObject } from "../../state/data-object/DataObjectStates";
import { useUserActiveProfile } from "../../state/user/useUserActiveProfile";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { deleteUserProfile } from "./deleteUserProfile";
import { openEditUserProfile } from "./openEditUserProfile";
import { produce } from "immer";

export const UserProfileDisplay = ({ profileId }: { profileId: string }) => {
  const activeProfile = useUserActiveProfile();

  const profile = useDataObject<AppUserProfile>(profileId);
  if (!profile) {
    return undefined;
  }
  const { name } = profile;
  const isActiveProfile = profileId === activeProfile?.id;

  return (
    <Card>
      <Flex align={"center"} gap="2">
        <Text color={isActiveProfile ? "green" : undefined}>{name}</Text>
        <AppButtonGroup
          colors={{ delete: "red" }}
          actions={{
            delete: () => {
              deleteUserProfile(profileId);
            },
            edit: () => {
              // const upgraded = produce(profile, (state) => {
              //   state.providers = UserProfiles.upgradeServiceProviders(
              //     state.providers
              //   );
              // });
              openEditUserProfile(profile);
            },
          }}
        />
      </Flex>
    </Card>
  );
};
