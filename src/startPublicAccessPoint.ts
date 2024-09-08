import type { TypeInfo } from "@mjtdev/engine";
import { Returns } from "./state/data-object/Returns";
import { AppMessagesState } from "./state/ws/AppMessagesState";

export const startPublicAccessPoint = (
  accessPointId: string,
  params: Record<string, string> = {},
  schema?: TypeInfo<unknown>["schema"]
) => {
  return new Promise((resolve, reject) => {
    const returnId = Returns.addReturnListener({
      onTimeout: () => {
        reject(
          new Error(
            `startAgentAccessPoint: timed out starting chat for access point: ${accessPointId}`
          )
        );
      },

      onReturn: (chatId) => {
        resolve(chatId);
      },
    });
    AppMessagesState.dispatch({
      type: "chat:startPublicAgent",
      detail: { returnId, accessPointId, params, schema },
    });
  });
};
