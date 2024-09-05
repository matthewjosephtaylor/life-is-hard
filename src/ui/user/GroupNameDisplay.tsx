import { Text, Badge } from "@radix-ui/themes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { idToColor } from "../visual/idToColor";
import { Colors } from "@mjtdev/engine";


export const GroupNameDisplay = ({ groupId }: { groupId: string; }) => {
  const group = DataObjectStates.useDataObject<AppGroup>(groupId);
  const backgroundColor = idToColor(groupId);
  const color = Colors.textColor([backgroundColor]);
  return (
    <Badge style={{ backgroundColor, color }}>
      <Text> {group?.name ?? groupId}</Text>
    </Badge>
  );
};
