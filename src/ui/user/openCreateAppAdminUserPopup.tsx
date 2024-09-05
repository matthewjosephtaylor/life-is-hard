import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { openAppPopup } from "../popup/openAppPopup";
import { CreateAppAdminUserPopup } from "./CreateAppAdminUserPopup";

export const openCreateAppAdminUserPopup = () => {
  return new Promise((resolve, reject) => {
    openAppPopup(
      <CreateAppAdminUserPopup
        onSubmit={async (loginInfo) => {
          if (!loginInfo) {
            resolve(false);
            return;
          }
          console.log("dispatching", { loginInfo });
          AppMessagesState.dispatch({
            type: "user:create",
            detail: {
              groups: ["app-admin"],
              ...loginInfo,
            },
          });
          resolve(true);
        }}
      />,
      {
        style: { width: "fit-content" },
      }
    );
  });
};
