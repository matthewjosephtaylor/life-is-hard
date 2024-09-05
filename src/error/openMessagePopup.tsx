import { openAppPopup } from "../ui/popup/openAppPopup";
import { MessagePopup } from "./MessagePopup";

export const openMessagePopup = (message: unknown) => {
  openAppPopup(<MessagePopup message={message} />, {
    style: { maxWidth: "fit-content" },
  });
};
