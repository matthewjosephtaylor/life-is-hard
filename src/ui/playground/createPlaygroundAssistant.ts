import { type AppMessageMap } from "ai-worker-common";
import { Returns } from "../../state/data-object/Returns";
import { AppModes } from "../../state/location/AppModes";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { suAssistant } from "./suAssistant";
import { startNewPlaygroundChat } from "./startNewPlaygroundChat";

export const createPlaygroundAssistant = () => {
  return new Promise((resolve, reject) => {
    const returnId = Returns.addReturnListener<
      AppMessageMap["playground:createAssistant:result"]
    >({
      onReturn: async (detail) => {
        console.log("createPlaygroundAssistant: got return", detail);
        await suAssistant({
          characterId: detail.assistantCharacterId,
          trueName: detail.trueName,
        });
        AppModes.upsertHashParam("assistantId", detail.assistantCharacterId);
        AppModes.upsertHashParam("trueName", detail.trueName);
        resolve(undefined);
      },
    });
    AppMessagesState.dispatch({
      type: "playground:createAssistant",
      detail: {
        returnId,
      },
    });
  });
};
