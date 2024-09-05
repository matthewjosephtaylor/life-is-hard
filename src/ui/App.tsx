import { isDefined, isUndefined, Reacts } from "@mjtdev/engine";
import { getAppModesAndParams } from "../state/location/getAppModesAndParams";
import { findAppContainer } from "./findAppContainer";
import { APP_FRONTS } from "../app-front/pizza-demo/APP_FRONTS";

export const App = async () => {
  const container = findAppContainer();
  if (isUndefined(container)) {
    console.error("No div container found with ID 'ai-workforce'");
    return;
  }
  if (window.location.pathname === "/playground") {
    return Reacts.render(APP_FRONTS["playground"], document.body, container);
  }
  const { modes, hashParams } = getAppModesAndParams();
  if (modes.includes("overlay")) {
    return Reacts.render(APP_FRONTS["overlay"], document.body, container);
  }
  if (!modes.includes("power") && isDefined(hashParams.appFront)) {
    console.log("App front:", hashParams.appFront);
    const child = APP_FRONTS[hashParams.appFront];
    if (isUndefined(child)) {
      console.error("No such app-front:", hashParams.appFront);
      return Reacts.render(
        <>NO such app-front: {child}</>,
        document.body,
        container
      );
    }
    return Reacts.render(child, document.body, container);
  }

  Reacts.render(APP_FRONTS["power-user"], document.body, container);
};
