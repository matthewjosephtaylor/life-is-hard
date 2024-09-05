import { Grid, Objects, createState } from "@mjtdev/engine";
import { AppBorder } from "./AppBorder";
import { useAgentsState } from "../../bot/AgentsState";
import { AgentAvatar } from "./AgentAvatar";

export const AgentsGallery = () => {
  const { agents } = useAgentsState();
  console.log({ agents });
  console.log(typeof agents);
  console.log(agents.length);
  console.log(Array.isArray(agents));

  const avatars = Objects.values(agents)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((a, i) => <AgentAvatar key={i} agent={a} />);
  return (
    <AppBorder
      style={{ maxWidth: "80vw", maxHeight: "80vh", overflow: "auto" }}
      title="agents"
    >
      <Grid direction="column" count={5}>
        {avatars}
      </Grid>
    </AppBorder>
  );
};
