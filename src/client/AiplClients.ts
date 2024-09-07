import { isUndefined } from "@mjtdev/engine";
// import { connectWs } from "./connectWs";
import { type AppMessageMap } from "ai-worker-common";
import { getBackendUser } from "../backend/user/getBackendUser";
import { startPublicAccessPoint } from "../startPublicAccessPoint";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { findFirstPapId } from "../ui/overlay/findFirstPapId";
import { log } from "./log";

export type AiplClient = ReturnType<typeof createAiplClient>;

export const createAiplClient = (props: Partial<{}> = {}) => {
  return {
    ask: async (props: AppMessageMap["chat:ask"]) => {
      const result = await AppMessagesState.call("chat:ask", props);
      return result as string;
    },
    log,
    startChat: (params: Record<string, string> = {}) => {
      return startPublicAccessPoint(findFirstPapId()!, params);
    },
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
