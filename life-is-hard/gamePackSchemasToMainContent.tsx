import { CreateObjectMain } from "./CreateObjectMain";
import type { GamePack } from "./state/GamePack";

export const gamePackSchemasToMainContent = (gamePack: GamePack) => {
  const { schemas } = gamePack;

  return Object.fromEntries(
    schemas.map((schema) => {
      return [`create-${schema.$id}`, <CreateObjectMain />] as const;
    })
  );
};
