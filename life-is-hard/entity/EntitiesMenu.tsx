import { MenuTree } from "../common/MenuTree";
import type { GameEntity } from "../state/GamePack";
import { updateLihState, useLihState } from "../state/LihState";

export const EntitiesMenu = () => {
  const { gamePack } = useLihState();
  const { entities } = gamePack;

  // return <
  return (
    <MenuTree
      items={entities}
      getItemId={(item) => item.id}
      getItemLabel={function (item: GameEntity<unknown>): string {
        return (item.object as { name: string })?.name ?? item.id;
      }}
      getType={function (item: GameEntity<unknown>): string {
        return item.schemaName ?? "unknown";
      }}
      onItemClick={(evt, itemId) => {
        console.log("Clicked on entity", itemId);

        updateLihState((s) => {
          // s.currentSchema = schemas.find((schema) => schema.$id === itemId);
          // console.log("s.currentSchema", s.currentSchema);
          const entity = entities.find((entity) => entity.id === itemId);
          const currentItemSchema = s.gamePack.schemas.find(
            (schema) => schema.$id === entity?.schemaName
          );
          if (!currentItemSchema) {
            const currentSchema = s.gamePack.schemas.find(
              (schema) => schema.$id === itemId
            );
            if (currentSchema) {
              s.currentSchema = currentSchema;
              s.currentObjectId = undefined;
              s.selectedContent = `createType`;
            }
            return;
          }
          s.currentSchema = currentItemSchema;
          s.currentObjectId = itemId;
          s.selectedContent = `createObject`;
        });
      }}
    />
  );
};
