import { createState, type TypeInfo } from "@mjtdev/engine";
import type { GamePack } from "./GamePack";

export const DEFAULT_GAME_PACK: GamePack = {
  entities: [],
  id: "default",
  name: "Default",
  schemas: [],
};

export const [useLihState, updateLihState, getLihState] = createState({
  mode: "play" as "design" | "play",
  mainContent: "createType" as "createObject" | "createType" | "locations",
  gamePack: DEFAULT_GAME_PACK,
  currentSchema: undefined as undefined | TypeInfo["schema"],
  currentObjectId: undefined as undefined | string,
  currentLocationId: undefined as undefined | string,
});

export type LihState = ReturnType<typeof getLihState>;
