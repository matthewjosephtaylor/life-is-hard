import { isDefined, Randoms, isUndefined } from "@mjtdev/engine";
import { AiplClients } from "../../../src/client/AiplClients";
import { getBasicEntityMeta } from "../../common/ifGet";
import type { GameEntity } from "../../state/GameEntity";
import { getLihState, updateLihState } from "../../state/LihState";

let askingingForNpc = false;
export const createNpcCharacter = async (npcName: string) => {
  if (askingingForNpc) {
    return;
  }
  const { gamePack } = getLihState();
  const existingEntity = gamePack.entities
    .filter((e) => e.category === "npc")
    .find((e) => getBasicEntityMeta(e.meta, (e) => e.name) === npcName);
  if (isDefined(existingEntity)) {
    return;
  }
  askingingForNpc = true;
  try {
    const client = AiplClients.createAiplClient();
    const userMessage = `Create a new NPC character with the name: ${npcName}`;
    const characterSchemas = gamePack.entities
      .filter((e) => e.category === "npc")
      .map((e) => e.schemaName);
    const characterSchemaName = Randoms.pickRandom(characterSchemas);
    if (isUndefined(characterSchemaName)) {
      console.error("No character schema found");
      return;
    }
    const characterSchema = gamePack.schemas.find(
      (s) => s.$id === characterSchemaName
    );
    if (isUndefined(characterSchema)) {
      console.error(`No schema found for ${characterSchemaName}`);
      return;
    }
    const ans = await client.ask({
      userMessage,
      toolConfig: { schema: characterSchema },
    });
    const json = JSON.parse(ans);
    console.log(json);
    const entity: GameEntity = {
      id: `${characterSchemaName}-${Date.now()}-${crypto.randomUUID()}`,
      category: "npc",
      schemaName: characterSchemaName,
      object: json,
      meta: { name: npcName },
      dynamic: true,
    };
    console.log(entity);
    updateLihState((s) => {
      s.gamePack.entities.push(entity);
    });
  } catch (error) {
    console.error(error);
  } finally {
    askingingForNpc = false;
  }
};
