import { AppEvents } from "../../event/AppEvents";
import { AppMessagesState } from "../ws/AppMessagesState";
import { deliverMessage } from "./deliverMessage";

export const setupDataObjectsStateAppEventsListeners = () => {
  AppEvents.addEventListener("message", (evt) => {
    deliverMessage(evt.detail);
  });

  AppEvents.addEventListener("abort-generation", (evt) => {
    AppMessagesState.dispatch({
      type: "abort",
      detail: undefined,
    });
  });
};
