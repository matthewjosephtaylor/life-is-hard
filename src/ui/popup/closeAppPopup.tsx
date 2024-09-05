import { updateAppPopupState } from "./AppPopupState";

export const closeAppPopup = () => {
  updateAppPopupState((s) => {
    s.popupContents.pop();
  });
};

