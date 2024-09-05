import { getUserState } from "./state/user/UserState";
import { openCreateAppAdminUserPopup } from "./ui/user/openCreateAppAdminUserPopup";
import { openLoginUserDialog } from "./ui/user/login/openLoginUserDialog";

export const performLoginRitual = async () => {
  if (new URLSearchParams(window.location.search).get("access")) {
    await openCreateAppAdminUserPopup();
    openLoginUserDialog();
    return;
  }

  if (!getUserState().authToken) {
    return openLoginUserDialog();
  }
};
