import { isUndefined, type TypeInfo } from "@mjtdev/engine";
// import { connectWs } from "./connectWs";
import { type AppMessageMap } from "ai-worker-common";
import { getBackendUser } from "../backend/user/getBackendUser";
import { startPublicAccessPoint } from "../startPublicAccessPoint";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { findFirstPapId } from "../ui/overlay/findFirstPapId";
import { log } from "./log";

export type AiplClient = ReturnType<typeof createAiplClient>;

export const createAiplClient = (
  props: Partial<{ schema: TypeInfo<unknown>["schema"] }> = {}
) => {
  return {
    ask: async (props: AppMessageMap["chat:ask"]) => {
      const result = await AppMessagesState.call("chat:ask", props);
      return result as string;
    },
    log,
    startChat: (
      props: Partial<{
        params: Record<string, string>;
        schema: TypeInfo<unknown>["schema"];
        systemMessage: string;
      }> = {}
    ) => {
      const { params, schema, systemMessage } = props;
      return startPublicAccessPoint({
        accessPointId: findFirstPapId()!,
        params,
        schema,
      });
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
