import type { GAME_ENTITY_CATEGORIES } from "./GAME_ENTITY_CATEGORIES";
import type { GameImage } from "./GameImage";

export type GameEntity<T = unknown> = {
  id: string;
  schemaName?: string;
  object?: T;
  category: (typeof GAME_ENTITY_CATEGORIES)[number];
  image?: GameImage;
  meta?: unknown;
};
