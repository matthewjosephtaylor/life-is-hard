import { MenuTree } from "../common/MenuTree";
import { updateLihState, useLihState } from "../state/LihState";

export const SchemasMenu = () => {
  const { gamePack } = useLihState();
  const { schemas } = gamePack;
  return (
    <MenuTree
      items={schemas}
      getItemId={(item) => {
        return item.$id ?? "Schema";
      }}
      getItemLabel={function (item): string {
        return item.$id ?? "Types";
      }}
      getType={function (item): string {
        return "types";
      }}
      onItemClick={(evt, itemId) => {
        updateLihState((s) => {
          s.currentSchema = schemas.find((schema) => schema.$id === itemId);
          console.log("s.currentSchema", s.currentSchema);
          s.mainContent = "createType";
        });
      }}
    />
  );
};
