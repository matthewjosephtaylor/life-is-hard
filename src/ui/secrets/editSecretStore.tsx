import { isUndefined } from "@mjtdev/engine";
import type { AppSecretStore } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { closeAppPopup } from "../popup/closeAppPopup";
import { openAppPopup } from "../popup/openAppPopup";
import { SecretStoreTable } from "./SecretStoreTable";

export const editSecretStore = async ({ storeId }: { storeId: string }) => {
  const updated = await new Promise<AppSecretStore | undefined>(
    (resolve, reject) => {
      openAppPopup(
        <SecretStoreTable
          storeId={storeId}
          onChange={(value) => {
            closeAppPopup();
            resolve(value);
          }}
        />,
        {
          onClose: () => resolve(undefined),
        }
      );
    }
  );
  console.log("updated", updated);
  if (isUndefined(updated)) {
    return;
  }
  console.log("updated after", updated);

  return DataObjectStates.upsertDataObject({
    objectType: "app-secret-store",
    draft: updated,
  });
};
