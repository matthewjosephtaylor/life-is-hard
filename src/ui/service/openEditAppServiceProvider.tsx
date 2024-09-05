import type { AppServiceProvider } from "ai-worker-common";
import { closeAppPopup } from "../popup/closeAppPopup";
import { openAppPopup } from "../popup/openAppPopup";
import { EditAppServiceProvider } from "./EditAppServiceProvider";

export const openEditAppServiceProvider = (
  serviceProvider: Partial<AppServiceProvider> = {}
) => {
  return new Promise<Partial<AppServiceProvider> | undefined>(
    (resolve, reject) =>
      openAppPopup(
        <EditAppServiceProvider
          defaultValue={serviceProvider}
          onSubmit={(provider) => {
            closeAppPopup();
            resolve(provider);
          }}
        />,
        {
          style: { maxWidth: "fit-content" },
          onClose: () => resolve(undefined),
        }
      )
  );
};
