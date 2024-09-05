import { updateAppPopupState } from "./AppPopupState";

export const closeAllAppPopups = () => {
  updateAppPopupState((s) => {
    s.popupContents.length = 0;
  });
};
