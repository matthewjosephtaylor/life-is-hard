import { isUndefined } from "@mjtdev/engine";
import { useEffect } from "react";
import { AiplComponentProvider } from "../../provider/AiplComponentProvider";
import { useAppState } from "../../state/app/AppState";
import { useAppModesAndParams } from "../../state/location/useAppModesAndParams";
import { hideLoadingScreen } from "../../ui/hideLoadingScreen";
import { pizzaDemoConfig } from "./pizzaDemoConfig";
import { PizzaDemo } from "./PizzaDemo";

export const PizzaDemoFront = () => {
  const { hashParams } = useAppModesAndParams();

  const { aiBaseUrl } = useAppState();
  useEffect(() => {
    hideLoadingScreen();
  }, []);

  if (isUndefined(aiBaseUrl)) {
    return <>No BaseUrl</>;
  }

  if (isUndefined(hashParams.papId)) {
    return <>No PAP ID</>;
  }

  return (
    <AiplComponentProvider
      config={{
        ...pizzaDemoConfig,
        papId: hashParams.papId,
        homeUrl: aiBaseUrl,
      }}
    >
      <PizzaDemo />
    </AiplComponentProvider>
  );
};
