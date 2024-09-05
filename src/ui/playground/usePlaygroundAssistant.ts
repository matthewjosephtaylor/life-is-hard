import { first, isDefined } from "@mjtdev/engine";
import type { AppCharacter } from "ai-worker-common";
import { useEffect, useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";
import { useUserState } from "../../state/user/UserState";
import { suAssistant } from "./suAssistant";

export const usePlaygroundAssistant = () => {
  const assistantId = AppModes.useAppHashParam("assistantId");
  const trueName = AppModes.useAppHashParam("trueName");
  const { id: subjectId } = useUserState();
  const [result, setResult] = useState({
    loaded: false,
    assistantCharacter: undefined as AppCharacter | undefined,
    userCharacter: undefined as AppCharacter | undefined,
  });
  const authorizedAsAssistant = assistantId === subjectId;
  useEffect(() => {
    if (!authorizedAsAssistant) {
      console.log("usePlaygroundAssistant: not authorizedAsAssistant", {
        assistantId,
        subjectId,
      });
      // attempt to su and if not fail to undefined so we can create new assistant
      if (isDefined(assistantId) && isDefined(trueName)) {
        suAssistant({ characterId: assistantId, trueName }).then((data) => {
          setResult({
            loaded: true,
            assistantCharacter: data?.assistantCharacter,
            userCharacter: data?.userCharacter,
          });
        });
      }
    }
    if (authorizedAsAssistant) {
      DataObjectStates.getDataObject<AppCharacter>(assistantId).then(
        async (assistantCharacter) => {
          const userCharacter = first(
            await DataObjectStates.getChildDataObjects(
              assistantId,
              "app-character",
              "userCharacter"
            )
          );
          setResult({ loaded: true, assistantCharacter, userCharacter });
        }
      );
      return;
    }
  }, [assistantId, authorizedAsAssistant, subjectId, trueName]);

  return result;
};
