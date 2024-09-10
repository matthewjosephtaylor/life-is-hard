import type { TypeInfo } from "@mjtdev/engine";
import type { GameEntity } from "./GameEntity";

export type GamePack = {
  id: string;
  name: string;
  entities: GameEntity[];
  schemas: TypeInfo["schema"][];
};

