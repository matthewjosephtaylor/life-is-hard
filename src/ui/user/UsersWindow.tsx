import {
  Box,
  Button,
  Container,
  Flex,
  Section,
  Separator,
} from "@radix-ui/themes";
import { AppObjects } from "ai-worker-common";
import { useEffect } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppGroupsAppAdminDisplay } from "./AppGroupsAppAdminDisplay";
import { AppUsersDisplay } from "./AppUsersDisplay";
import { HARD_GROUPS } from "./HARD_GROUPS";
import { openCreateAppAdminUserPopup } from "./openCreateAppAdminUserPopup";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { Returns } from "../../state/data-object/Returns";

export const UsersWindow = () => {
  const refresh = () => {
    DataObjectStates.findAllDataObjectsByObjectType("app-user");
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Section>
      <Container
        size={{
          sm: "3",
          lg: "4",
        }}
      >
        <Flex
          style={{ maxHeight: "calc(100vh - 15em)", overflow: "auto" }}
          direction={"column"}
          gap="2"
        >
          <Flex>
            Special Controls{" "}
            <AppButtonGroup
              actions={{
                listActiveSessions: () => {
                  const returnId = Returns.addReturnListener({
                    onReturn: (data) => {
                      console.log(data);
                    },
                  });
                  AppMessagesState.dispatch({
                    type: "app:sessions:list",
                    detail: { returnId },
                  });
                },
                resetActiveSessions: () => {
                  const returnId = Returns.addReturnListener({
                    onReturn: (data) => {
                      console.log(data);
                    },
                  });
                  AppMessagesState.dispatch({
                    type: "app:sessions:reset",
                    detail: { returnId },
                  });
                },
              }}
            />
          </Flex>
          <Flex>
            <Button
              color="amber"
              onClick={() => {
                openCreateAppAdminUserPopup();
              }}
            >
              Create App Admin User
            </Button>
            <Box flexGrow="1" />
            <Button onClick={() => refresh()}>Refresh</Button>
          </Flex>
          <Separator size={"4"} />
          <Flex gap="2" wrap="wrap">
            <AppGroupsAppAdminDisplay
              extraGroups={HARD_GROUPS.map((id) =>
                AppObjects.create("app-group", { id, name: id })
              )}
            />
            <AppUsersDisplay />
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};
