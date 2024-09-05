import { DataObjectStates } from "../data-object/DataObjectStates";

export const useActiveGroup = (parentId?: string) => {
  const activeGroups = DataObjectStates.useChildDataObjects(
    parentId,
    "app-group",
    "active"
  );
  return (activeGroups ?? [])[0];
};
