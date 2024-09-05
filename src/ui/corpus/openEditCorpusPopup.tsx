import type { Corpus} from "ai-worker-common";
import { DataIndex } from "ai-worker-common";
import { openFormEditorPopup } from "../form/openFormEditorPopup";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";

export const openEditCorpusPopup = async (draft: Partial<Corpus> = {}) => {
  const edited = await openFormEditorPopup<Omit<Corpus, "documentIdxId">>(
    draft
  );
  if (!edited) {
    return;
  }
  return DataObjectStates.upsertDataObject({
    objectType: "corpus",
    draft: edited,
    parentId: getUserState().id,
  });
};
