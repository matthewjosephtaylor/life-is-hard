import type { TypeInfo } from "@mjtdev/engine";

export type GamePack = {
  id: string;
  name: string;
  entities: GameEntity[];
  schemas: TypeInfo["schema"][];
};

export type GameEntity<T = unknown> = {
  id: string;
  schemaName?: string;
  object?: T;
};
