import { MenuTree } from "../common/MenuTree";
import type { GameEntity } from "../state/GamePack";
import { useLihState } from "../state/LihState";

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
        console.log("Clicked on item", itemId);
      }}
    />
  );
};
