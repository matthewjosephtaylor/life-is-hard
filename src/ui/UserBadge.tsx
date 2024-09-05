import { isUndefined } from "@mjtdev/engine";
import { Button, Flex, Text } from "@radix-ui/themes";
import type { AppCharacter, AppUser } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { useUserState } from "../state/user/UserState";
import { useUserActiveProfile } from "../state/user/useUserActiveProfile";
import { DEFAULT_CHAR_URL } from "./DEFAULT_CHAR_URL";
import { DataImage } from "./image/DataImage";
import { openAppPopup } from "./popup/openAppPopup";
import { UserEditorPopup } from "./user/UserEditorPopup";

export const UserBadge = () => {
  const { id: userId, authToken } = useUserState();

  const user = DataObjectStates.useDataObject<AppUser>(userId);

  const profile = useUserActiveProfile();

  const userCharacterId = profile?.userCharacterId;

  const userCharacter =
    DataObjectStates.useDataObject<AppCharacter>(userCharacterId);

  const userCharacterImage = (
    <DataImage
      style={{ height: "2em", width: "2em" }}
      dataId={userCharacter?.imageDataId}
      src={user?.publicAvatar ?? DEFAULT_CHAR_URL}
    />
  );

  const loginoutStatusColor = isUndefined(authToken) ? "red" : "blue";

  return (
    <Button
      m="2"
      variant="ghost"
      onClick={() => {
        openAppPopup(<UserEditorPopup />, { style: { width: "fit-content" } });
      }}
      style={{ userSelect: "none" }}
    >
      <Flex direction={"column"} gap="1">
        <Flex align={"center"} gap="2">
          <Text color={loginoutStatusColor}>
            {user?.publicName ?? user?.userName ?? "No user"}
          </Text>
          {userCharacterImage}
        </Flex>
      </Flex>
    </Button>
  );
};
