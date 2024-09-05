import { openAppPopup } from "../../popup/openAppPopup";
import { LoginUserDialog } from "./LoginUserDialog";

export const openLoginUserDialog = () => {
  return openAppPopup(<LoginUserDialog />, {
    style: { width: "fit-content", height: "fit-content" },
  });
};
