import { type Idb, Idbs } from "@mjtdev/engine";
import type { GameState } from "./GameState";

export const GAME_STATE_DB: Idb<GameState> = {
  dbName: "life-is-hard",
  storeName: "gamestate",
};

export const storeGameState = (key: string, gameState: GameState) => {
  return Idbs.put(GAME_STATE_DB, key, gameState);
};

export const loadGameState = (key: string) => {
  return Idbs.get(GAME_STATE_DB, key);
};

export const listGameStates = () => {
  return Idbs.list(GAME_STATE_DB);
};
