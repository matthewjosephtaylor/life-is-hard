import { Inputs, isUndefined } from "@mjtdev/engine";
import "@radix-ui/themes/styles.css";
import { setupLocalAiFunctions } from "./ai-function/setupLocalAiFunctions";
import { performLoginRitual } from "./performLoginRitual";
import { setupMonaco } from "./setupMonaco";
import { startPublicAccessPoint } from "./startPublicAccessPoint";
import {
  getAppState,
  loadAppState,
  updateAppState,
} from "./state/app/AppState";
import { DataObjectStates } from "./state/data-object/DataObjectStates";
import { setupDataObjectsStateAppEventsListeners } from "./state/data-object/setupDataObjectsStateAppEventsListeners";
import { findHomebaseUrl } from "./state/findHomebaseUrl";
import { getAppModesAndParams } from "./state/location/getAppModesAndParams";
import { getUserState } from "./state/user/UserState";
import { connectWs } from "./state/ws/connectWs";
import { App } from "./ui/App";
import { openAppSettingsPopup } from "./ui/AppSettingsPopup";
import { findFirstPapId } from "./ui/overlay/findFirstPapId";

(async () => {
  const homebaseUrl = findHomebaseUrl();

  console.log("Build Timestamp: " + __BUILD_TIMESTAMP__);
  console.log("App Version: " + __APP_VERSION__);
  // console.log("App Interface ID: " + appInterfaceId);
  console.log("Home Base: " + homebaseUrl);

  Inputs.listenToKey(
    {
      "CTRL+SHIFT+P": () => openAppSettingsPopup(),
      "CTRL+SHIFT+D": () => {
        console.log(getAppState());
        console.log(getUserState());
        DataObjectStates.dumpDataObjects();
      },
    }

    // { debug: true }
  );

  setupDataObjectsStateAppEventsListeners();

  await loadAppState();
  updateAppState((s) => {
    if (homebaseUrl) {
      s.aiBaseUrl = homebaseUrl;
    }
  });

  await connectWs();

  setupMonaco();

  const locationState = getAppModesAndParams();

  if (locationState.modes.includes("pap")) {
    console.log("Waiting on PAP start..");
    const papId = findFirstPapId();
    if (isUndefined(papId)) {
      console.log("No PAP ID found");
      return;
    }

    const chatId = await startPublicAccessPoint(
      papId,
      // location.pathname.replaceAll("/", ""),
      locationState.params
    );
  }

  if (
    !locationState.modes.includes("pap") &&
    !location.pathname.includes("playground")
  ) {
    performLoginRitual();
  }

  setupLocalAiFunctions();
  if (locationState.modes.includes("overlay")) {
    updateAppState((s) => {
      s.agreedToTerms = true;
    });
  }

  updateAppState((s) => {
    s.agreedToTerms = true;
  });
  return App();
})();
