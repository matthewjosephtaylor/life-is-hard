import { Objects, isUndefined } from "@mjtdev/engine";
import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppDropDown } from "../common/AppDropDown";

export const AppGroupsDropDown = ({
  extraGroups = [],
  parentId,
  activeGroupId,
  onChange = () => {},
}: {
  activeGroupId?: string;
  parentId?: string;
  extraGroups?: Readonly<AppGroup[]>;
  onChange: (groupId: string) => void;
}) => {
  const groups = DataObjectStates.useChildDataObjects(parentId, "app-group");
  if (isUndefined(parentId)) {
    return <>No parentId</>;
  }
  return (
    <AppDropDown
      value={activeGroupId}
      placeholder={"No Active Group"}
      title={"Active Group"}
      values={Objects.fromEntries(
        [...groups, ...extraGroups].map((g) => [g.id, g.name ?? g.id])
      )}
      onChange={(activeId) => {
        onChange(activeId);
      }}
    />
  );
};
