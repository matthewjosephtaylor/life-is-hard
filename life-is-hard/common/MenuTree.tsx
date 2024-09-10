import { Button } from "@mui/material";
import type { TreeItemProps } from "@mui/x-tree-view";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import type { DataObject } from "ai-worker-common";

interface MenuTreeProps<T> {
  items: T[]; // Now explicitly defining `items` as part of MenuTreeProps
  getType: (item: T) => string;
  onAdd?: (type: string) => void;
  onRemove?: (type: string) => void;
}

export interface GroupedItem<T> {
  id: string;
  label: string;
  children: T[];
}

export const MenuTree = <T extends {}>({
  items,
  getType,
  onAdd,
  onRemove,
  ...rest
}: MenuTreeProps<T> & Omit<Parameters<typeof RichTreeView<T>>[0], "items">) => {
  // Group items by type (folders)
  const groupedData: GroupedItem<T>[] = Object.entries(
    items.reduce((acc: Record<string, T[]>, item) => {
      const folder = getType(item);
      if (!acc[folder]) {
        acc[folder] = [];
      }
      acc[folder].push(item);
      return acc;
    }, {})
  ).map(([type, items]) => ({
    id: type,
    label: type,
    children: items,
  }));

  // Render label with Add/Remove buttons

  return (
    <RichTreeView<GroupedItem<T>>
      items={groupedData} // Now passing groupedData correctly
      {...(rest as Omit<
        Parameters<typeof RichTreeView<GroupedItem<T>>>[0],
        "items"
      >)} // Spreading the rest props correctly
    />
  );
};
