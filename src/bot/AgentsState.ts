import type { Idb} from "@mjtdev/engine";
import { Idbs, createState } from "@mjtdev/engine";
import type { AiAgent } from "ai-worker-common";

export type AiAgentsState = { agents: Record<string, AiAgent> };

export const AgentsDB: Idb<AiAgentsState> = {
  dbName: "ai-thing",
  storeName: "agents",
};

export const [useAgentsState, updateAgentsState, getAgentsState] =
  createState<AiAgentsState>({ agents: {} });

export const storeAiAgentsState = (key = "state") => {
  const bots = getAgentsState();
  return Idbs.put(AgentsDB, key, bots);
};

export const loadAiAgentsState = async (key = "state") => {
  const bots = await Idbs.get(AgentsDB, key);
  if (!bots) {
    return;
  }
  updateAgentsState(() => bots);
};
