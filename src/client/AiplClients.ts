import { createState, isUndefined } from "@mjtdev/engine";
import type { AiplClientState } from "./AiplClientState";
import { call } from "./call";
import { connectWs } from "./connectWs";
import { getBackendUser } from "./getBackendUser";
import { log } from "./log";
import { userLogin } from "./userLogin";
import { papAuth } from "./papAuth";
import type { AppMessageMap } from "ai-worker-common";

export type AiplClient = ReturnType<typeof createAiplClient>;

// export type Capabilities = {};

export type AiplClientContext = ReturnType<typeof createClientContext>;

export const createClientContext = (init: AiplClientState = {}) => {
  const [_, update, get] = createState<AiplClientState>(init);

  return Object.freeze({ update, get });
};

export const createAiplClient = (
  props: Partial<{ authToken: string; url: string }> = {}
) => {
  const { url } = props;
  const ctx = createClientContext({ homebaseUrl: url });
  connectWs(ctx);

  return {
    hello: () => {
      console.log("hello from aipl client");
    },
    ping: () => {
      const con = connectWs(ctx);
      console.log("conn", con);
    },
    login: async ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => {
      return userLogin({ userName, password, ctx });
    },
    papAuth: async ({ accessPointId }: { accessPointId: string }) => {
      return papAuth({ accessPointId, ctx });
    },
    ask: async (props: AppMessageMap["chat:ask"]) => {
      const result = await call(ctx, "chat:ask", props);
      return result as string;
    },
    log,
    listPersonas: async () => {
      const user = await getBackendUser(ctx);
      if (isUndefined(user)) {
        throw new Error("No user ID found");
      }
      return call(ctx, "dataObject:getChildren", {
        parentId: user?.id,
        objectType: "app-character",
      });
    },

    startSession: async (
      props: Partial<{ personaId: string; sessionId: string }>
    ) => {
      const session = await call(ctx, "chat:start", {
        aiCharacterId: props.personaId,
      });
      return session;
    },
  };
};

export const AiplClients = {
  createAiplClient,
};
