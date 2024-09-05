import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { openFormEditorPopup } from "../form/openFormEditorPopup";

export const openCreateVoicePopup = async () => {
  const { id: userId } = getUserState();
  if (!userId) {
    return;
  }
  const draft = await openFormEditorPopup({
    name: "New Voice",
  });
  if (!draft) {
    return;
  }

  return DataObjectStates.upsertDataObject({
    draft,
    objectType: "voice",
    parentId: userId,
  });
};
