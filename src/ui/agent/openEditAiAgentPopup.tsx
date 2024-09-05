import { openCenteredPopup } from "@mjtdev/engine";
import type { AiAgent } from "ai-worker-common";
import { getAgentsState } from "../../bot/AgentsState";
import { EditAiAgentPopup } from "./EditAiAgentPopup";

export const openEditAiAgentPopup = async (
  id?: string
): Promise<Partial<AiAgent | undefined>> => {
  const name = "ai-bot-popup";
  const defaultValue = id
    ? getAgentsState().agents[id]
    : {
        name: "AI Agent",
      };
  return new Promise((resolve, reject) => {
    openCenteredPopup(
      <EditAiAgentPopup
        onSubmit={(value) => {
          resolve(value);
        }}
        defaultValue={defaultValue}
        name={name}
      />,
      {
        name,
        onClose: () => resolve(undefined),
      }
    );
  });
};
