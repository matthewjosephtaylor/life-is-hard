import { DataObjectStates } from "../data-object/DataObjectStates";

export const getActiveGroup = async (parentId: string) => {
  const activeGroups = await DataObjectStates.getChildDataObjects(
    parentId,
    "app-group",
    "active"
  );
  return (activeGroups ?? [])[0];
};
