import { AppEvents } from "../event/AppEvents";
import { LOCAL_AI_FUNCTIONS } from "./LOCAL_AI_FUNCTIONS";

export const setupLocalAiFunctions = () => {
  AppEvents.addEventListener("function:call", ({ detail: call }) => {
    console.log("GOT CALL ", { call });
    const func = LOCAL_AI_FUNCTIONS[call.name!];
    if (func) {
      try {
        func(call);
      } catch (err) {
        console.log(err);
      }
    }
    // if (call.name === "openDialog") {
    // }
  });
};
