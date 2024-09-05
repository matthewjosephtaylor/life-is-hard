import { Button, Card, Flex, Separator, Table, Text } from "@radix-ui/themes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppUserRowDisplay } from "./AppUserRowDisplay";
import { openCreateAppUserPopup } from "./openCreateAppUserPopup";

export const AppUsersDisplay = () => {
  const users = DataObjectStates.useDataObjectsByType("app-user");
  const userColumnHeaders = ["Name", "Groups", "Actions"];
  return (
    <Card>
      <Flex
        style={{ maxHeight: "40vh", overflow: "auto" }}
        align={"center"}
        direction={"column"}
        gap="2"
      >
        <Flex align={"center"} gap="5">
          <Text>Users</Text>
          <Separator orientation="vertical" style={{ height: "2em" }} />
          <Button
            onClick={() => {
              openCreateAppUserPopup();
            }}
          >
            Create User
          </Button>
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
            {[...users]
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user, i) => (
                <AppUserRowDisplay user={user} key={i} />
              ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Card>
  );
};
