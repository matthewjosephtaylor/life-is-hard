import { AppObjects } from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { AppEvents } from "../../event/AppEvents";
import { openFormEditorPopup } from "../form/openFormEditorPopup";

export const openCreateVectorStorePopup = async () => {
  const draft = await openFormEditorPopup({
    name: "New Vector Store",
  });
  if (!draft) {
    return;
  }
  const vectorStore = AppObjects.create("vector-store", draft);
  if (!vectorStore) {
    return AppEvents.dispatchEvent("error", "Error creating vectorStore");
  }
  return DataIndexesStates.setUserDataIndexStateRecord(
    "vector-store",
    "vector-store",
    vectorStore
  );
};
