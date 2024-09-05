import { DataObjectStates } from "../state/data-object/DataObjectStates";

export const deleteChat = async (chatId: string) => {
  return DataObjectStates.deleteDataObject(chatId);
};
