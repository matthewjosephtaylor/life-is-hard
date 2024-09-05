import { isUndefined } from "@mjtdev/engine";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { AppCharacter } from "ai-worker-common";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { Returns } from "../../state/data-object/Returns";
import { AppEvents } from "../../event/AppEvents";
import { updateUserState } from "../../state/user/UserState";

export const suAssistant = ({
  characterId,
  trueName,
}: {
  characterId: string;
  trueName: string;
}) => {
  return new Promise<
    | { assistantCharacter: AppCharacter; userCharacter: AppCharacter }
    | undefined
  >((resolve, reject) => {
    console.log("suAssistant: characterId", characterId);
    console.log("suAssistant: trueName", trueName);
    if (isUndefined(trueName)) {
      return AppEvents.dispatchEvent(
        "error",
        new Error(`suAssistant: missing trueName for: ${characterId}`)
      );
    }
    const returnId = Returns.addReturnListener<string>({
      onReturn: async (authToken) => {
        console.log("suAssistant: authToken", authToken);
        if (isUndefined(authToken)) {
          return resolve(undefined);
        }

        updateUserState((s) => {
          s.authToken = authToken;
          s.id = characterId;
        });
        const assistantCharacter =
          await DataObjectStates.getDataObject<AppCharacter>(characterId);
        const userCharacter =
          await DataObjectStates.getDataObject<AppCharacter>(characterId);
        console.log("createPlaygroundAssistant: got characters", {
          userCharacter,
          assistantCharacter,
        });
        if (isUndefined(assistantCharacter) || isUndefined(userCharacter)) {
          return reject(new Error("suAssistant: missing characters"));
        }
        resolve({ assistantCharacter, userCharacter });
      },
    });
    AppMessagesState.dispatch({
      type: "playground:suAssistant",
      detail: { characterId, returnId, trueName },
    });
  });
};
