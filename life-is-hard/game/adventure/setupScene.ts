import { AiplClients } from "../../../src/client/AiplClients";
import { getGameState } from "../../state/GameState";
import { getLihState } from "../../state/LihState";

export const setupScene = () => {
  const { gamePack } = getLihState();
  const { activeGoals, currentLocationId } = getGameState();

  const currentLocation = gamePack.entities.find(
    (e) => e.id === currentLocationId
  );
  const pc = gamePack.entities.find((e) => e.category === "pc");
  const npcs = gamePack.entities.filter((e) => e.category === "npc");
  const goals = gamePack.entities.filter((e) => e.category === "goal");

  const client = AiplClients.createAiplClient();
  const systemMessage = ["As a master CYOA story teller", ""].join("\n");
  client.ask({});
};
