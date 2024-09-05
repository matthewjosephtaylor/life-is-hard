import { isUndefined } from "@mjtdev/engine";
import { Button, Card, Flex, Separator, Table, Text } from "@radix-ui/themes";
import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { useActiveGroup } from "../../state/user/useActiveGroup";
import { AppGroupRowDisplay } from "./AppGroupRowDisplay";
import { createAppGroup } from "./createAppGroup";
import { AppGroupsDropDown } from "./AppGroupsDropDown";
import { switchActiveGroup } from "../../state/user/switchActiveGroup";

export const AppGroupsDisplay = ({
  extraGroups = [],
  parentId,
}: {
  parentId?: string;
  extraGroups?: Readonly<AppGroup[]>;
}) => {
  const groups = DataObjectStates.useChildDataObjects(parentId, "app-group");
  const activeGroup = useActiveGroup(parentId);

  const userColumnHeaders = ["Name", "Actions"];
  if (isUndefined(parentId)) {
    return <>No parentId</>;
  }

  return (
    <Card>
      <Flex
        style={{ maxHeight: "30vh", overflow: "auto" }}
        align={"center"}
        direction={"column"}
        gap="2"
      >
        <AppGroupsDropDown
          activeGroupId={activeGroup?.id}
          extraGroups={extraGroups}
          parentId={parentId}
          onChange={(groupId) => {
            switchActiveGroup({
              subjectId: parentId,
              activeId: groupId,
              // groupIds: groups.map((g) => g.id),
            });
          }}
        />
        <Separator size="4" />
        <Flex align={"center"} gap="5">
          <Text>Groups</Text>
          <Separator orientation="vertical" style={{ height: "2em" }} />
          <Button onClick={() => createAppGroup()}>Create Group</Button>
        </Flex>
        <Table.Root
          style={{
            maxHeight: "calc(80vh - 15em)",
            overflow: "auto",
          }}
        >
          <Table.Header>
            <Table.Row>
              {userColumnHeaders.map((header, i) => (
                <Table.ColumnHeaderCell key={i}>
                  {header}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {[...groups, ...extraGroups]
              .sort((a, b) => (a.name ?? a.id).localeCompare(b.name ?? a.id))
              .map((group, i) => (
                <AppGroupRowDisplay defaultValue={group} key={group.id} />
              ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Card>
  );
};
