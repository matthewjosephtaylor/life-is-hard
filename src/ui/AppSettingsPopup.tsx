import {
  Border,
  ButtonGroup,
  Grid,
  closePopup,
  openCenteredPopup,
} from "@mjtdev/engine";
import { play } from "../play/play";
import {
  getAppState,
  storeAppState,
  updateAppState,
  useAppState,
} from "../state/app/AppState";
import { getUserState } from "../state/user/UserState";
import { FormInputDisplay } from "./form/FormInputDisplay";
// import { getDataObjectsState } from "../state/data-object/DataObjectsState";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { SwrCaches, getSwrCacheKeys } from "../state/data-object/SwrCaches";
import { Returns } from "../state/data-object/Returns";
import { getCustomSwrState } from "../state/data-object/useCustomSwr";

export const AppSettingsPopup = ({ name }: { name: string }) => {
  const { aiBaseUrl } = useAppState();
  return (
    <Border
      style={{ backgroundColor: "black" }}
      title={<span style={{ backgroundColor: "black" }}>settings</span>}
    >
      <Grid direction="row" cellSize={"min-content"}>
        <FormInputDisplay
          title="base-url"
          defaultValue={aiBaseUrl}
          onChange={(value) => {
            updateAppState((state) => {
              state.aiBaseUrl = value;
            });
          }}
        />
        <ButtonGroup
          actions={{
            play: () => {
              play();
            },
            startPinger: () => {
              setInterval(() => {
                AppMessagesState.dispatch({
                  type: "ping",
                  detail: Date.now().toString(),
                });
              }, 5000);
              // play();
            },
            getRemoteQueryKeys: () => {
              const returnId = Returns.addReturnListener({
                onReturn: (data) => {
                  const remoteKeys = data as string[];
                  console.log("---remote---");
                  console.log(remoteKeys);
                  console.log("---local---");
                  const localKeys = SwrCaches.getSwrCacheKeys();
                  console.log(localKeys);
                  for (const localKey of localKeys) {
                    const remoteKeyIdx = remoteKeys.findIndex(
                      (rk) => rk === localKey
                    );
                    if (remoteKeyIdx === -1) {
                      console.log("remote missing local key!", localKey);
                    }
                  }
                  console.log("---after missing keys check---");
                  // DataObjectStates.dumpDataObjects();
                  //compare
                },
              });
              AppMessagesState.dispatch({
                type: "dataObject:query:getKeys",
                detail: { returnId },
              });

              // SwrCaches.invalidateEntireSwrCache();
            },
            invalidateCaches: () => {
              SwrCaches.invalidateEntireSwrCache();
            },
            dump: () => {
              console.log(getAppState());
              console.log(getUserState());
              DataObjectStates.dumpDataObjects();
              // console.log(getDataObjectsState());
            },
          }}
        />
      </Grid>
    </Border>
  );
};

export const openAppSettingsPopup = () => {
  const name = "app-settings-popup";
  return openCenteredPopup(<AppSettingsPopup name={name} />, { name });
};
