import { useAppPopupState } from "./AppPopupState";

export const AppPopup = () => {
  const { popupContents } = useAppPopupState();
  return <>{popupContents}</>;
};
