import { Objects } from "@mjtdev/engine";
import { Button, Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { getUserState } from "../../../state/user/UserState";
import { useUserActiveProfile } from "../../../state/user/useUserActiveProfile";
import { FormSelect } from "../../form/FormSelect";
import { AppGroupsDropDown } from "../../user/AppGroupsDropDown";
import { EditAppServiceProviders } from "../../user/EditAppServiceProviders";

export const ModifyCharacterAccess = ({
  characterId,
  activeGroupId,

  onActiveGroupChange,
}: {
  activeGroupId?: string;
  characterId: string;
  onActiveGroupChange: (groupId: string) => void;
}) => {
  const { id: userId } = getUserState();
  const userGroups = DataObjectStates.useChildDataObjects(userId, "app-group");

  const profiles = DataObjectStates.useChildDataObjects(userId, "user-profile");
  const activeProfile = useUserActiveProfile();
  const [selectedCopyFromProfile, setSelectedCopyFromProfile] =
    useState(activeProfile);

  const copyFromServiceProviders = DataObjectStates.useChildDataObjects(
    selectedCopyFromProfile?.id,
    "app-service-provider"
  );

  const characterServiceProviders = DataObjectStates.useChildDataObjects(
    characterId,
    "app-service-provider"
  );

  return (
    <Flex direction={"column"} gap="2">
      <Separator size="4" />
      <Flex align={"center"} gap="2">
        <AppGroupsDropDown
          activeGroupId={activeGroupId}
          onChange={(groupId) => onActiveGroupChange(groupId)}
          parentId={characterId}
          extraGroups={userGroups}
        />
      </Flex>
      <Separator size="4" />
      <Flex gap="2" align={"center"}>
        <FormSelect
          title={"Copy Service Configs From"}
          defaultValue={selectedCopyFromProfile?.id}
          values={Objects.fromEntries(profiles.map((p) => [p.id, p.name]))}
          onChange={(id) => {
            setSelectedCopyFromProfile(profiles.find((p) => p.id === id));
          }}
        />
        <Button
          onClick={() => {
            for (const copyFrom of copyFromServiceProviders) {
              const { id, ...rest } = copyFrom;
              DataObjectStates.upsertDataObject({
                objectType: "app-service-provider",
                draft: { ...rest },
                parentId: characterId,
              });
            }
          }}
        >
          Copy
        </Button>
      </Flex>
      <Separator size="4" />
      <EditAppServiceProviders
        parentId={characterId}
        defaultProviders={characterServiceProviders}
      />
    </Flex>
  );
};
