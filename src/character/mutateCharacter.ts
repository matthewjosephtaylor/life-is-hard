import type { AppCharacter } from "ai-worker-common";
import { DataObjectStates } from "../state/data-object/DataObjectStates";

export const mutateCharacter = async (
  id: string,
  mutator: (character: AppCharacter) => void
) => {
  DataObjectStates.mutateDataObject<AppCharacter>(id, (c) => {
    if (!c) {
      return c;
    }
    mutator(c);
  });
};
