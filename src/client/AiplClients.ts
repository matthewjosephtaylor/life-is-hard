import { isUndefined, type TypeInfo } from "@mjtdev/engine";
import { type AppMessageMap, type SdApiTxt2ImgRequest } from "ai-worker-common";
import { askForGeneratedImages } from "../ai/askForGeneratedImages";
import { getBackendUser } from "../backend/user/getBackendUser";
import { startPublicAccessPoint } from "../startPublicAccessPoint";
import { addChatMessage } from "../state/chat/addChatMessage";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { findFirstPapId } from "../ui/overlay/findFirstPapId";
import { log } from "./log";

export type AiplClient = ReturnType<typeof createAiplClient>;

export const createAiplClient = () => {
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
        systemMessage,
      });
    },
    addChatUserMessage: async (props: Parameters<typeof addChatMessage>[0]) => {
      return addChatMessage(props);
    },
    askForGeneratedImages: async (
      request: Partial<SdApiTxt2ImgRequest> = {},
      options: Partial<{ signal: AbortSignal }> = {}
    ) => {
      return askForGeneratedImages(request, options);
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
