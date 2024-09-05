import { DataObjectStates } from "../../../state/data-object/DataObjectStates";

export const deleteAccessPoint = ({
  parentId,
  accessToken,
}: {
  parentId: string;
  accessToken: string;
}) => {
  return DataObjectStates.deleteDataLink({
    parentId,
    childId: accessToken,
    objectType: "access-point",
  });
};
