import { Button, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useChildDataObjects } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { activateUserProfile } from "../../state/user/activateUserProfile";
import { useUserActiveProfile } from "../../state/user/useUserActiveProfile";

export const ActiveProfileDropDown = () => {
  const { id: userId } = getUserState();
  const profiles = useChildDataObjects(userId, "user-profile");
  const activeProfile = useUserActiveProfile();

  return (
    <Card>
      <Flex align={"center"} gap="2">
        <Text>Active Profile</Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>
              {activeProfile
                ? activeProfile.name ?? activeProfile.id
                : "No Active Profile"}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Flex gap="1" direction={"column"}>
              {profiles.map((profile, i) => (
                <DropdownMenu.Item
                  key={i}
                  onSelect={() => activateUserProfile(profile.id)}
                >
                  <Flex style={{ userSelect: "none" }}>
                    {profile.name ?? profile.id}
                  </Flex>
                </DropdownMenu.Item>
              ))}
            </Flex>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Card>
  );
};


