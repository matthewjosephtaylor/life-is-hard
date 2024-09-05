import {
  getAgentsState,
  storeAiAgentsState,
  updateAgentsState,
} from "../../bot/AgentsState";
import { openEditAiAgentPopup } from "./openEditAiAgentPopup";

export const openUpdateAiAgentPopup = async (id: string) => {
  const agent = getAgentsState().agents[id];
  if (!agent) {
    return;
  }
  const draft = await openEditAiAgentPopup(id);
  if (!draft) {
    return;
  }
  updateAgentsState((state) => {
    state.agents[agent.id] = { ...agent, ...draft };
  });
  await storeAiAgentsState();
};
