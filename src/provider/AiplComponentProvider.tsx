import { isDefined, isUndefined } from "@mjtdev/engine";
import { useEffect, useState, type ReactNode } from "react";
import {
  type AiplComponentContextConfig,
  type AiplComponentContextState,
} from "../aipl-components/AiplComponentContextState.ts";
import { createAiplClient, type AiplClient } from "../client/AiplClients.ts";
import { AppEvents } from "../event/AppEvents.ts";
import { useAppState } from "../state/app/AppState.ts";
import { useAppModesAndParams } from "../state/location/useAppModesAndParams.ts";
import { AiplComponentContext } from "./AiplComponentContext.tsx";

let aiplClient: AiplClient | undefined = undefined;

export const AiplComponentProvider = ({
  config,
  children,
  defaultComponentState = {},
}: {
  config: Partial<AiplComponentContextConfig>;
  defaultComponentState?: Record<string, string | string[]>;
  children: ReactNode;
}) => {
  const { hashParams } = useAppModesAndParams();

  const { aiBaseUrl } = useAppState();
  const accessPointId = config.papId ?? hashParams.papId;
  const homeUrl = config.homeUrl ?? aiBaseUrl;
  const [state, setState] = useState<AiplComponentContextState>({
    ...config,
    homeUrl,
    papId: accessPointId,
    componentState: defaultComponentState,
    updateComponentState: (componentState) => {
      setState((s) => ({ ...s, componentState }));
    },
  });

  useEffect(() => {
    if (isDefined(aiplClient)) {
      return setState((s) => ({ ...s, client: aiplClient }));
    }
    const client = createAiplClient({});
    aiplClient = client;
    setState((s) => ({ ...s, client: aiplClient }));
    client.startChat({ schema: config.typeInfo?.schema });
  }, [config]);

  AppEvents.useEventListener(
    "client:aiplComponentUpdate",
    (message) => {
      const { data: componentState } = message.detail;
      if (isUndefined(componentState)) {
        return;
      }
      state.updateComponentState(
        componentState as Record<string, string | string[]>
      );
    },
    [state]
  );
  return (
    <AiplComponentContext.Provider value={state}>
      <div>{children}</div>
    </AiplComponentContext.Provider>
  );
};
