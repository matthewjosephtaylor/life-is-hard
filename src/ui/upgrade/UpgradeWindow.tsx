import { Container, Flex, Section, Strong } from "@radix-ui/themes";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { AppButtonGroup } from "../common/AppButtonGroup";

export const SpecialActionsWindow = () => {
  return (
    <Section>
      <Container>
        <Flex align={"center"} direction={"column"} gap="4">
          <Strong>DO NOT CLICK UNLESS YOU KNOW WHAT YOU ARE DOING!</Strong>
          <AppButtonGroup
            colors={{ upgradeApp: "red", reset: "amber" }}
            actions={{
              reset: () => {
                AppMessagesState.dispatch({
                  type: "app:reset",
                  detail: "",
                });
              },
              upgradeApp: () => {
                AppMessagesState.dispatch({
                  type: "app:upgrade",
                  detail: "",
                });
              },
              setAlarm: () => {
                AppMessagesState.dispatch({
                  type: "app:setAlarm",
                  detail: 0,
                });
              },
            }}
          />
        </Flex>
      </Container>
    </Section>
  );
};
