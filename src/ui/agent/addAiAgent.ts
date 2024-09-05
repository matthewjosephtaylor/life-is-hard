import { AiAgents } from "ai-worker-common";
import { storeAiAgentsState, updateAgentsState } from "../../bot/AgentsState";
import { openEditAiAgentPopup } from "./openEditAiAgentPopup";

export const addAiAgent = async () => {
  const draft = await openEditAiAgentPopup();
  if (!draft) {
    return;
  }
  const agent = AiAgents.createAiAgent(draft);
  // const putResp = await createBackendDataObject("ai-agent", agent);
  updateAgentsState((state) => {
    state.agents[agent.id] = agent;
  });
  await storeAiAgentsState();
};
