import { MenuTree } from "../common/MenuTree";
import { updateLihState, useLihState } from "../state/LihState";

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
        return item.$id ?? "Types";
      }}
      getType={function (item): string {
        return "types";
      }}
      onItemClick={(evt, itemId) => {
        console.log("Clicked on item schema item", itemId);
        updateLihState((s) => {
          s.currentSchema = schemas.find((schema) => schema.$id === itemId);
          console.log("s.currentSchema", s.currentSchema);
          s.selectedContent = "createType";
        });
      }}
    />
  );
};
