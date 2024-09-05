import { AppEvents } from "../../../event/AppEvents";


export const abortGeneration = () => {
  AppEvents.dispatchEvent("abort-generation", undefined);
};
