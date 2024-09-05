import { Button, Container, Flex, Separator } from "@radix-ui/themes";
import { useChildDataObjects } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { addUserProfile } from "../../state/user/addUserProfile";
import { UserProfileDisplay } from "./UserProfileDisplay";
import { ActiveProfileDropDown } from "./ActiveProfileDropDown";

export const UserProfilesDisplay = () => {
  const { id: userId } = getUserState();
  const profiles = useChildDataObjects(userId, "user-profile");

  const contents = [...profiles]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p, i) => <UserProfileDisplay key={i} profileId={p.id} />);

  return (
    <Container style={{ width: "fit-content" }}>
      <Flex
        gap="4"
        align={"center"}
        direction={"column"}
        style={{ maxHeight: "20em", overflow: "auto" }}
      >
        <Flex align={"center"} gap="5">
          <ActiveProfileDropDown />

          <Separator orientation="vertical" style={{ height: "2em" }} />
          <Button
            onClick={() => {
              addUserProfile();
            }}
          >
            Add Profile
          </Button>
        </Flex>
        <Separator size={"4"} />
        <Flex align={"end"} direction="column" gap={"2"}>
          {contents}
        </Flex>
      </Flex>
    </Container>
  );
};
