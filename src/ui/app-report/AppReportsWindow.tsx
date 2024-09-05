import {
  Button,
  Container,
  Flex,
  Section,
  Separator,
  Strong,
} from "@radix-ui/themes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { useEffect } from "react";
import { BrowserFiles } from "@mjtdev/engine";

export const AppReportsWindow = () => {
  const users = DataObjectStates.useDataObjectsByType("app-user");

  const refresh = () => {
    DataObjectStates.findAllDataObjectsByObjectType("app-user");
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Section>
      <Container>
        <Flex
          style={{ maxHeight: "calc(100vh - 15em)", overflow: "auto" }}
          direction={"column"}
          align={"center"}
          gap="2"
        >
          <Strong>Reports</Strong>
          <Separator size={"4"} />
          <Button onClick={() => refresh()}>Refresh Users List</Button>
          <Button
            onClick={() => {
              const openBetaUsers = users.filter((u) =>
                u.groups.includes("open-beta")
              );
              const lines = openBetaUsers.map(
                (u) => `"${u.publicName}","${u.userName}","${u.publicAvatar}"`
              );
              const header = ["Name", "Email", "Avatar"].join(",");
              const report = [header, ...lines].join("\n");
              BrowserFiles.writeFileBrowser(
                `open-beta-${new Date().toUTCString()}.csv`,
                report
              );
            }}
          >
            Download Open Beta Users
          </Button>
        </Flex>
      </Container>
    </Section>
  );
};
