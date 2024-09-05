import { AppWindow } from "../AppWindow";
import { AgentsGallery } from "./AgentsGallery";
import { addAiAgent } from "./addAiAgent";

export const AgentsWindow = () => {
  return (
    <AppWindow title={"agents window"}>
      <input onClick={() => addAiAgent()} type="button" value="Create Agent" />
      <AgentsGallery />
    </AppWindow>
  );
};
