import { Button, Container, Flex, Section, Table } from "@radix-ui/themes";
import type { AppMessageMap, AppUser } from "ai-worker-common";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { GroupNameDisplay } from "./GroupNameDisplay";
import { openAppPopup } from "../popup/openAppPopup";
import { openFormEditorPopup } from "../form/openFormEditorPopup";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { ModifyAppUserGroups } from "./ModifyAppUserGroups";
import { Returns } from "../../state/data-object/Returns";

export const AppUserRowDisplay = ({ user }: { user: AppUser }) => {
  return (
    <Table.Row>
      <Table.Cell>{user.userName}</Table.Cell>
      <Table.Cell>
        <Flex
          style={{ maxWidth: "20em", overflow: "auto" }}
          wrap="wrap"
          gap="1"
        >
          {user.groups.map((groupId, i) => (
            <GroupNameDisplay key={i} groupId={groupId} />
          ))}
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <AppButtonGroup
          colors={{
            delete: "red",
            changePassword: "yellow",
            modifyGroups: "yellow",
          }}
          actions={{
            modifyGroups: () => {
              openAppPopup(<ModifyAppUserGroups user={user} />);
            },
            delete: () => {
              AppMessagesState.dispatch({
                type: "user:delete",
                detail: user.id,
              });
            },
            switchUser: () => {
              AppMessagesState.dispatch({
                type: "app:su",
                detail: {
                  userId: user.id,
                },
              });
            },
            changePassword: async () => {
              const form = await openFormEditorPopup<
                Partial<{ password: string }>
              >(
                { password: "" },
                {
                  title: `Change Password for: ${user.userName}`,
                }
              );
              if (!form || !form.password || form.password.length === 0) {
                return;
              }

              AppMessagesState.dispatch({
                type: "user:changePassword",
                detail: { userId: user.id, password: form.password },
              });
            },
          }}
        />
      </Table.Cell>
    </Table.Row>
  );
};
