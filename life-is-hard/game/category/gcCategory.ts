import type { GameEntity } from "../../state/GameEntity";
import { useLihState } from "../../state/LihState";

export const gcCategory = (category: GameEntity["category"]) => {
  const { gamePack } = useLihState();
  const dynamicEntities = gamePack.entities.filter(
    (entity) => entity.category === category && entity.dynamic
  );
  console.log(`gcCategory ${category}`, dynamicEntities);
};
