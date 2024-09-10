import { storeGamePack } from "./GAME_PACK_DB";
import { updateLihState, getLihState } from "./LihState";


export const deleteSchemaFromGamePack = (schemaId: string) => {
  updateLihState((s) => {
    const gamePack = s.gamePack;
    if (!gamePack) {
      return;
    }
    gamePack.schemas = gamePack.schemas.filter((s) => s.$id !== schemaId);
  });
  const { gamePack } = getLihState();
  storeGamePack(gamePack);
};
