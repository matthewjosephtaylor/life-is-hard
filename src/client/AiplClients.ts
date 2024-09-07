import { isUndefined } from "@mjtdev/engine";
// import { connectWs } from "./connectWs";
import { type AppMessageMap } from "ai-worker-common";
import { getBackendUser } from "../backend/user/getBackendUser";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { log } from "./log";

export type AiplClient = ReturnType<typeof createAiplClient>;

// export type Capabilities = {};

// export type AiplClientContext = ReturnType<typeof createClientContext>;

// export const createClientContext = (init: AiplClientState = {}) => {
//   const [_, update, get] = createState<AiplClientState>(init);

//   return Object.freeze({ update, get });
// };

export const createAiplClient = (
  props: Partial<{ authToken: string; url: string }> = {}
) => {
  const { url } = props;
  // const ctx = createClientContext({ homebaseUrl: url });

  // ctx.update((s) => {
  //   s.ws = getAppState().ws;
  // });

  // connectWs(ctx);

  return {
    ask: async (props: AppMessageMap["chat:ask"]) => {
      const result = await AppMessagesState.call("chat:ask", props);
      return result as string;
    },
    log,
    listAgents: async () => {
      const user = await getBackendUser();
      if (isUndefined(user)) {
        throw new Error("No user ID found");
      }

      return AppMessagesState.call("dataObject:getChildren", {
        parentId: user?.id,
        objectType: "app-character",
      });
    },
  };
};

export const AiplClients = {
  createAiplClient,
};
