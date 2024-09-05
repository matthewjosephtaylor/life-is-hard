import type { AppService } from "ai-worker-common";
import { openAppPopup } from "../popup/openAppPopup";
import { EditAppService } from "./EditAppService";

export const openEditAppServicePopup = (defaultValue: Partial<AppService>) => {
  return openAppPopup(<EditAppService defaultValue={defaultValue} />, {
    style: {
      width: "fit-content",
    },
  });
};
