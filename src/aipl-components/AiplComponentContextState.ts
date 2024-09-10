import type { TypeInfo } from "@mjtdev/engine";
import type { AiplClient } from "../client/AiplClients";

export type AiplComponentContextConfig<T = unknown> = {
  typeInfo?: TypeInfo<T>;
};

export type AiplComponentContextState<T = unknown> =
  AiplComponentContextConfig<T> & {
    client?: AiplClient;
    componentState: Record<string, string | string[]>;
    updateComponentState: (
      componentState: Record<string, string | string[]>
    ) => void;
  };
