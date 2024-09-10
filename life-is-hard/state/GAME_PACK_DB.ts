import { type Idb, Idbs } from "@mjtdev/engine";
import type { GamePack } from "./GamePack";

export const GAME_PACK_DB: Idb<GamePack> = {
  dbName: "life-is-hard",
  storeName: "gamepack",
};

export const storeGamePack = (gamePack: GamePack) => {
  return Idbs.put(GAME_PACK_DB, gamePack.id, gamePack);
};

export const loadGamePack = (key: string) => {
  return Idbs.get(GAME_PACK_DB, key);
};
