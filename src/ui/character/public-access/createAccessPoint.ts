import { DataObjectStates } from "../../../state/data-object/DataObjectStates";

export const createAccessPoint = ({ parentId }: { parentId: string }) => {
  return DataObjectStates.upsertDataObject({
    objectType: "access-point",
    parentId,
  });
};
