import { createState, type TypeInfo } from "@mjtdev/engine";
import type { GamePack } from "./GamePack";
import type { MAIN_CONTENTS } from "../MAIN_CONTENTS";

export const DEFAULT_GAME_PACK: GamePack = {
  entities: [],
  id: "default",
  name: "Default",
  schemas: [],
};

export const [useLihState, updateLihState, getLihState] = createState({
  mode: "play" as "design" | "play",
  mainContent: "locations" as keyof typeof MAIN_CONTENTS,
  gamePack: DEFAULT_GAME_PACK,
  currentGameStateKey: "current",
  currentSchema: undefined as undefined | TypeInfo["schema"],
  currentObjectId: undefined as undefined | string,
});

export type LihState = ReturnType<typeof getLihState>;
