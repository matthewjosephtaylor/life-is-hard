import { Button, Card, Flex, Separator, Table, Text } from "@radix-ui/themes";
import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppGroupRowDisplay } from "./AppGroupRowDisplay";
import { createAppGroup } from "./createAppGroup";

export const AppGroupsAppAdminDisplay = ({
  extraGroups = [],
}: {
  extraGroups?: AppGroup[];
}) => {
  const groups = DataObjectStates.useDataObjectsByType("app-group");

  const userColumnHeaders = ["Name", "Actions"];

  return (
    <Card>
      <Flex
        style={{ maxHeight: "30vh", overflow: "auto" }}
        align={"center"}
        direction={"column"}
        gap="2"
      >
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
