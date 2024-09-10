import type { TypeInfo } from "@mjtdev/engine";
import { storeGamePack } from "./GAME_PACK_DB";
import { updateLihState, getLihState } from "./LihState";


export const saveSchemaToGamePack = (schema: TypeInfo["schema"]) => {
  updateLihState((s) => {
    const gamePack = s.gamePack;
    if (!gamePack) {
      return;
    }
    // replace the schema if it already exists
    const existing = gamePack.schemas.findIndex((s) => s.$id === schema.$id);
    if (existing !== -1) {
      console.log(`Replacing existing schema ${schema.$id}`, schema);
      gamePack.schemas[existing] = schema;
      return;
    }
    gamePack.schemas.push(schema);
  });
  const { gamePack } = getLihState();
  storeGamePack(gamePack);
};


