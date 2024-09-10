import type { TypeInfo } from "@mjtdev/engine";
import { MenuTree, type GroupedItem } from "../common/MenuTree";
import { updateLihState, useLihState } from "../state/LihState";
import { Button } from "@mui/material";
import {
  TreeItem,
  type TreeItem2Props,
  type TreeItemProps,
} from "@mui/x-tree-view";

export const SchemasMenu = () => {
  const { gamePack } = useLihState();
  const { schemas } = gamePack;
  console.log("schemas", schemas);
  return (
    <MenuTree
      items={schemas}
      getItemId={(item) => {
        console.log("item", item);
        return item.$id ?? "Schema";
      }}
      getItemLabel={function (item): string {
        // return (item.object as { name: string })?.name ?? item.id;
        console.log("item", item);
        return item.$id ?? "Schema";
      }}
      getType={function (item): string {
        return "schema";
      }}
      onItemClick={(evt, itemId) => {
        console.log("Clicked on item", itemId);
        updateLihState((s) => {
          s.currentSchema = schemas.find((schema) => schema.$id === itemId);
          s.selectedContent = "createType";
        });
      }}
      // slots={{
      //   item: ({
      //     item,
      //   }:
      //   ) =>
      //     renderLabelWithActions(item), // Custom render function for each item
      // }}
      // slots={{
      //   item: ({ itemId, label, id }: TreeItemProps) => {
      //     // console.log("props", props);
      //     // props.itemId
      //     return <Button>Click me</Button>;
      //   },
      // }}
    />
  );
};
