import { isDefined, isUndefined } from "@mjtdev/engine";
import { useEffect, useState, useMemo, type ReactNode } from "react";
import {
  type AiplComponentContextConfig,
  type AiplComponentContextState,
} from "../aipl-components/AiplComponentContextState.ts";
import { createAiplClient, type AiplClient } from "../client/AiplClients.ts";
import { AppEvents } from "../event/AppEvents.ts";
import { useAppState } from "../state/app/AppState.ts";
import { useAppModesAndParams } from "../state/location/useAppModesAndParams.ts";
import { AiplComponentContext } from "./AiplComponentContext.tsx";

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

  // Memoize config to avoid unnecessary re-renders
  const memoizedConfig = useMemo(
    () => ({
      ...config,
      homeUrl,
      papId: accessPointId,
    }),
    [config, homeUrl, accessPointId]
  );

  // State management for context state and client
  const [state, setState] = useState<AiplComponentContextState>({
    ...memoizedConfig,
    componentState: defaultComponentState,
    updateComponentState: (componentState) => {
      AppEvents.dispatchEvent("client:aiplComponentUpdate", {
        data: componentState,
      });
      // setState((s) => ({ ...s, componentState }));
    },
  });

  // State for AiplClient
  const [client, setClient] = useState<AiplClient | undefined>(undefined);

  // Effect to create or reuse AiplClient
  useEffect(() => {
    if (isDefined(client)) {
      setState((s) => ({ ...s, client }));
      return;
    }
    const newClient = createAiplClient({});
    setClient(newClient);
    setState((s) => ({ ...s, client: newClient }));
    newClient.startChat({ schema: memoizedConfig.typeInfo?.schema });
  }, [client, memoizedConfig]);

  // Event listener for client updates
  AppEvents.useEventListener(
    "client:aiplComponentUpdate",
    (message) => {
      const { data: componentState } = message.detail;
      if (isUndefined(componentState)) {
        return;
      }
      setState((s) => ({
        ...s,
        componentState: componentState as Record<string, string | string[]>,
      }));
    },
    []
  );

  // Provide the state to the context
  return (
    <AiplComponentContext.Provider value={state}>
      {children}
    </AiplComponentContext.Provider>
  );
};
