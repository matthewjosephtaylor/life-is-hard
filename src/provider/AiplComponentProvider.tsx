import { isUndefined, Keys } from "@mjtdev/engine";
import { useEffect, useState, type ReactNode } from "react";
import {
  type AiplComponentContextConfig,
  type AiplComponentContextState,
} from "../aipl-components/AiplComponentContextState.ts";
import { createAiplClient } from "../client/AiplClients.ts";
import { AppEvents } from "../event/AppEvents.ts";
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
  console.log("AiplComponentProvider", config);
  // State management for context state and client
  const [state, setState] = useState<AiplComponentContextState>({
    ...config,
    componentState: defaultComponentState,
    updateComponentState: (componentState) => {
      AppEvents.dispatchEvent("client:aiplComponentUpdate", {
        data: componentState,
      });
    },
  });

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
  useEffect(() => {
    const client = createAiplClient({ schema: config.typeInfo?.schema });
    setState((s) => ({
      ...s,
      ...config,
      client,
      componentState: defaultComponentState,
    }));
  }, [Keys.stableStringify([config, defaultComponentState])]);

  return (
    <AiplComponentContext.Provider value={state}>
      {children}
    </AiplComponentContext.Provider>
  );
};
