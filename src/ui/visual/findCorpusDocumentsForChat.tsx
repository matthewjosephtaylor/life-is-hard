import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { Chat } from "ai-worker-common";


export const findCorpusDocumentsForChat = (chat: Chat) => {
  DataObjectStates.findChildDataObjects(chat.id, "corpus-document");
  DataObjectStates.findChildDataObjects(chat.aiCharacterId, "corpus-document");
  DataObjectStates.findChildDataObjects(
    chat.userCharacterId,
    "corpus-document"
  );
};
