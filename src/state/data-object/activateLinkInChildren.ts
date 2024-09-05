import type { AppObjectType } from "ai-worker-common";
import { DataObjectStates } from "./DataObjectStates";


export const activateLinkInChildren = ({
  activeId, children, activationKey = "active", objectType, parentId,
}: {
  objectType: AppObjectType;
  parentId: string;
  children: string[];
  activeId: string;
  activationKey?: string;
}) => {
  for (const childId of children) {
    // TODO make upsert change values on key?
    DataObjectStates.deleteDataLink({
      childId,
      parentId,
      objectType,
      key: activationKey,
    });
  }
  DataObjectStates.upsertDataLink({
    childId: activeId,
    parentId,
    objectType,
    key: activationKey,
  });
};
