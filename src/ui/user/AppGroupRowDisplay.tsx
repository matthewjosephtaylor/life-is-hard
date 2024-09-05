import { Flex, Table, TextField } from "@radix-ui/themes";
import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { produce } from "immer";
import { useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { openAppPopup } from "../popup/openAppPopup";
import { GroupDefaultCharacters } from "./GroupDefaultCharacters";

export const AppGroupRowDisplay = ({
  defaultValue,
}: {
  defaultValue: AppGroup;
}) => {
  const [result, setResult] = useState(
    produce(defaultValue, () => defaultValue)
  );
  const [dirty, setDirty] = useState(false);
  const groupId = defaultValue.id;
  return (
    <Table.Row>
      <Table.Cell>
        <TextField.Root
          onChange={(evt) => {
            setResult(
              produce(result, (r) => {
                r.name = evt.currentTarget.value;
              })
            );
            setDirty(true);
          }}
          placeholder="Group Name"
          defaultValue={result.name}
        />
      </Table.Cell>
      <Table.Cell>
        <Flex gap="2">
          <AppButtonGroup
            colors={{ save: dirty ? "blue" : "gray", delete: "red" }}
            actions={{
              save: () => {
                DataObjectStates.mutateDataObject<AppGroup>(groupId, (g) => {
                  g.name = result.name;
                });
                setDirty(false);
              },
              delete: () => {
                DataObjectStates.deleteDataObject(groupId);
              },
              defaultCharacters: () => {
                openAppPopup(<GroupDefaultCharacters groupId={groupId} />);
              },
            }}
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
