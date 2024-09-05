import { Colors } from "@mjtdev/engine";
import {
  Badge,
  Button,
  Container,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useUserState } from "../../state/user/UserState";
import { userLogout } from "../../state/user/userLogout";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { useIsLoggedIn } from "../useIsLoggedIn";
import { idToColor } from "../visual/idToColor";
import { UserProfilesDisplay } from "./UserProfilesDisplay";
import { openLoginUserDialog } from "./login/openLoginUserDialog";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { AppUser } from "ai-worker-common";

export const UserEditorPopup = () => {
  const { id } = useUserState();
  const user = DataObjectStates.useDataObject<AppUser>(id);
  const groups = user?.groups ?? [];
  const logButton = useIsLoggedIn() ? (
    <Button
      color="red"
      style={{ width: "min-content", whiteSpace: "nowrap" }}
      onClick={() => {
        userLogout();
      }}
    >
      Log Out
    </Button>
  ) : (
    <Button
      style={{ width: "min-content", whiteSpace: "nowrap" }}
      onClick={() => {
        openLoginUserDialog();
      }}
    >
      Log In
    </Button>
  );

  const groupColors = groups.map((group) => {
    const backgroundColor = idToColor(group);
    const color = Colors.textColor([backgroundColor]);
    return { color, backgroundColor } as const;
  });

  return (
    <Container>
      <Flex align={"center"} direction={"column"} gap="5">
        <Flex align={"center"} gap="9">
          <Flex direction={"column"} gap="2">
            <FormInputDisplay
              disabled={true}
              title="Name"
              defaultValue={user?.userName}
            />

            <Flex gap="1" direction={"column"}>
              <Text as="label" size="2" mb="1" weight="bold">
                Groups
              </Text>
              {groups.map((group, i) => (
                <Flex key={i}>
                  <Badge
                    style={{
                      backgroundColor: groupColors[i].backgroundColor,
                      color: groupColors[i].color,
                    }}
                  >
                    {group}
                  </Badge>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Separator orientation="vertical" style={{ height: "5em" }} />

          {logButton}
        </Flex>
        <Separator size={"4"} />
        <UserProfilesDisplay />
      </Flex>
    </Container>
  );
};
