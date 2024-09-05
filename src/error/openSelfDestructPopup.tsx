import { closePopup, openCenteredPopup } from "@mjtdev/engine";
import { SelfDestructPopup } from "./SelfDestructPopup";


export const openSelfDestructPopup = (
  message: unknown,
  name = "self-destruct-popup"
) => {
  closePopup(name);
  openCenteredPopup(<SelfDestructPopup name={name} message={message} />, {
    name,
  });
};
