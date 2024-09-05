import { AppEvents } from "../../event/AppEvents";

export const toast = (message: string) => {
  return AppEvents.dispatchEvent("toast", message);
};
