import { Button, DropdownMenu, Flex, TextField } from "@radix-ui/themes";
import type { AccessPoint } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { getUserState } from "../../../state/user/UserState";
import { PaPCharacterAvatar } from "./PaPCharacterAvatar";
import { deleteAccessPoint } from "./deleteAccessPoint";
import { setAccessTokenUserCharacter } from "./setAccessTokenUserCharacter";
import { AppButtonGroup } from "../../common/AppButtonGroup";

export const PublicAccessPointDisplay = ({
  parentId,
  accessPointId,
}: {
  parentId: string;
  accessPointId: string;
}) => {
  const characters = DataObjectStates.useChildDataObjects(
    getUserState().id,
    "app-character"
  );

  const accessPoint =
    DataObjectStates.useDataObject<AccessPoint>(accessPointId);
  const userCharacters = DataObjectStates.useChildDataObjects(
    accessPointId,
    "app-character",
    "user"
  );
  const userCharacter = userCharacters[0];
  if (!accessPoint) {
    return <>No access token object for: ${accessPointId}</>;
  }
  const baseUrl = window.location.protocol + "//" + window.location.host;
  const url = `${baseUrl}/${accessPointId}`;
  const dropdownItems = characters.map((character, i) => (
    <DropdownMenu.Item
      onSelect={() => {
        setAccessTokenUserCharacter({ character, accessToken: accessPointId });
      }}
      key={i}
    >
      <PaPCharacterAvatar character={character} />
    </DropdownMenu.Item>
  ));
  return (
    <Flex flexShrink={"1"} gap="2">
      <TextField.Root
        onChange={(evt) => {
          DataObjectStates.mutateDataObject<AccessPoint>(
            accessPointId,
            (cur) => {
              cur.name = evt.currentTarget.value;
            }
          );
        }}
        defaultValue={accessPoint.name}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {userCharacter ? (
            <Button>
              <PaPCharacterAvatar character={userCharacter} />
            </Button>
          ) : (
            <Button>Choose User Character</Button>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Flex gap="1" direction={"column"}>
            {dropdownItems}
          </Flex>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <AppButtonGroup
        colors={{
          delete: "red",
        }}
        actions={{
          "Copy URL": () => {
            navigator.clipboard.writeText(url);
          },
          delete: () => {
            deleteAccessPoint({ parentId, accessToken: accessPointId });
          },
        }}
      />
    </Flex>
  );
};
