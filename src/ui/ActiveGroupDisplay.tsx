import { Button, Flex } from "@radix-ui/themes";
import { useActiveGroup } from "../state/user/useActiveGroup";
import { openAppPopup } from "./popup/openAppPopup";
import { AppGroupsDisplay } from "./user/AppGroupsDisplay";
import { useUserState } from "../state/user/UserState";

export const ActiveGroupDisplay = () => {
  const { id: userId } = useUserState();
  const activeGroup = useActiveGroup(userId);
  return (
    <Button
      m="2"
      variant="ghost"
      onClick={() => {
        openAppPopup(<AppGroupsDisplay parentId={userId} />);
      }}
      style={{ userSelect: "none" }}
    >
      <Flex>{activeGroup?.name ?? activeGroup?.id ?? "No Active Group"}</Flex>
    </Button>
  );
};
