import { Text } from "@radix-ui/themes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppTable } from "../common/app-table/AppTable";
import { editSecretStore } from "./editSecretStore";

export const SecretStoresTable = ({ subjectId }: { subjectId?: string }) => {
  const secretStores = DataObjectStates.useChildDataObjects(
    subjectId,
    "app-secret-store"
  );

  return (
    <AppTable
      headers={["name", "actions"]}
      cellRenderMap={{
        name: (cell) => <Text>{cell}</Text>,
        actions: (_cell, row) => (
          <AppButtonGroup
            colors={{ edit: "blue", delete: "red" }}
            actions={{
              edit: () => {
                editSecretStore({ storeId: row.id });
              },
              delete: () => {
                DataObjectStates.deleteDataObject(row.id);
              },
            }}
          />
        ),
      }}
      records={secretStores}
    />
  );
};
