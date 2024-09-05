import { Text, Flex, Card } from "@radix-ui/themes";
import type { AppUser } from "ai-worker-common";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { MultipleChoiceDisplay } from "./MultipleChoiceDisplay";
import { Objects } from "@mjtdev/engine";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { useState } from "react";
import { closeAppPopup } from "../popup/closeAppPopup";
import { HARD_GROUPS } from "./HARD_GROUPS";


export const ModifyAppUserGroups = ({ user }: { user: AppUser; }) => {
  const specialGroups = [...HARD_GROUPS, user.userName];
  const appGroups = DataObjectStates.useDataObjectsByType("app-group");
  const userGroups = user.groups;
  const possibleValues = [...appGroups.map((g) => g.id), ...specialGroups];

  const groupNames = Objects.fromEntries([
    ...appGroups.map((g) => [g.id, g.name ?? g.id] as const),
    ...specialGroups.map((g) => [g, g] as const),
  ]);

  const [result, setResult] = useState(userGroups);
  return (
    <Flex align="center" direction={"column"} gap="4">
      <Card>
        <Flex align={"center"} direction={"column"} gap="4">
          <Text as="label" size="2" mb="1" weight="bold">
            Modify Groups for: {user.userName}
          </Text>
          <MultipleChoiceDisplay
            defaultValue={userGroups}
            possibleValues={possibleValues}
            names={groupNames}
            onChange={(groupIds) => {
              setResult(groupIds);
            }} />
        </Flex>
      </Card>

      <AppButtonGroup
        colors={{ cancel: "gray" }}
        actions={{
          cancel: () => {
            closeAppPopup();
          },
          save: async () => {
            DataObjectStates.mutateDataObject<AppUser>(user.id, (cur) => {
              cur.groups = result;
            });

            closeAppPopup();
          },
        }} />
    </Flex>
  );
};
