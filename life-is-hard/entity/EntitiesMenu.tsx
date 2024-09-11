import { MenuTree } from "../common/MenuTree";
import type { GameEntity } from "../state/GameEntity";
import { updateLihState, useLihState } from "../state/LihState";

export const EntitiesMenu = ({
  getType = (item) => item.schemaName ?? "unknown",
}: {
  getType?: Parameters<typeof MenuTree<GameEntity>>[0]["getType"];
}) => {
  const { gamePack } = useLihState();
  const { entities } = gamePack;

  return (
    <MenuTree
      items={entities}
      getItemId={(item) => item.id}
      getItemLabel={function (item: GameEntity<unknown>): string {
        return (item.object as { name: string })?.name ?? item.id;
      }}
      getType={getType}
      onItemClick={(evt, itemId) => {
        updateLihState((s) => {
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
              s.mainContent = `createType`;
            }
            return;
          }
          s.currentSchema = currentItemSchema;
          s.currentObjectId = itemId;
          s.mainContent = `createObject`;
        });
      }}
    />
  );
};
