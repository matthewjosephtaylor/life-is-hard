import type { AppCharacter } from "ai-worker-common";
import { getDataObject } from "../state/data-object/DataObjectStates";

export const getCharacter = (id: string | undefined) => {
  if (!id) {
    return undefined;
  }
  return getDataObject<AppCharacter>(id);
};
