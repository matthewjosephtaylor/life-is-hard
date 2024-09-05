import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { openAppPopup } from "../popup/openAppPopup";
import { CreateAppUserPopup } from "./CreateAppUserPopup";

export const openCreateAppUserPopup = () => {
  return new Promise((resolve, reject) => {
    openAppPopup(
      <CreateAppUserPopup
        onSubmit={async (loginInfo) => {
          if (!loginInfo) {
            resolve(false);
            return;
          }
          AppMessagesState.dispatch({
            type: "user:create",
            detail: {
              ...loginInfo,
            },
          });
          resolve(true);
        }}
      />,
      { style: { width: "fit-content" } }
    );
  });
};
