import { isDefined, isUndefined, safe } from "@mjtdev/engine";
import { useEffect, useState, type ReactNode } from "react";
import { createAiplClient, type AiplClient } from "../client/AiplClients.ts";
import {
  type AiplComponentContextConfig,
  type AiplComponentContextState,
} from "../aipl-components/AiplComponentContextState.ts";
import { AiplComponentContext } from "./AiplComponentContext.tsx";
import { AppEvents } from "../event/AppEvents.ts";

let aiplClient: AiplClient | undefined = undefined;

export const AiplComponentProvider = ({
  config,
  children,
}: {
  config: AiplComponentContextConfig;
  children: ReactNode;
}) => {
  const [state, setState] = useState<AiplComponentContextState>({
    ...config,
    componentState: {},
    updateComponentState: (componentState) => {
      setState((s) => ({ ...s, componentState }));
    },
  });
  useEffect(() => {
    if (isDefined(aiplClient)) {
      return setState((s) => ({ ...s, client: aiplClient }));
    }
    const client = createAiplClient({ url: config.homeUrl });
    aiplClient = client;
    setState((s) => ({ ...s, client: aiplClient }));
    client.papAuth({ accessPointId: config.papId }).then(() => {
      console.log("aipl-client authorized");
    });
  }, [config]);

  AppEvents.useEventListener(
    "client:aiplComponentUpdate",
    (message) => {
      const { data: componentState } = message.detail;
      console.log("AiplComponentProvider: componentState", componentState);
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
