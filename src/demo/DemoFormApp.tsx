import { Center, Colors, Grid, Reacts } from "@mjtdev/engine";
import { FormInputDisplay } from "../ui/form/FormInputDisplay";
import { FormTextAreaDisplay } from "../ui/form/FormTextAreaDisplay";
import { useState } from "react";
import { startNewAgentChat } from "../chat/startNewAgentChat";
import { openErrorPopup } from "../error/openErrorPopup";
import { useAgentsState } from "../bot/AgentsState";
import { useCharactersState } from "../character/useCharactersState";
import { saveChatState } from "../chat/saveChatState";

export const DemoFormApp = async () => {
  Reacts.render(
    <Grid
      style={{
        width: "100vw",
        height: "100vh",
      }}
      cellSize={"min-content"}
      direction="row"
    >
      <DemoFormPage />
    </Grid>
  );
};

export const DemoFormPage = () => {
  const { agents } = useAgentsState();
  const { characters } = useCharactersState();
  const [state, setState] = useState({ name: "", phone: "", description: "" });

  const match = location.pathname.match(new RegExp("demo-(.*)"));
  if (!match) {
    return <>No agent ID in URL path!</>;
  }
  const agentId = match[1];
  const agent = agents[agentId];

  if (!agent || !agent.aiCharacterId) {
    return <>No agent or agent character available for id {agentId}!</>;
  }
  const aiCharacter = characters[agent.aiCharacterId];
  if (!aiCharacter) {
    return <>No Ai Character for id: {agent.aiCharacterId}</>;
  }
  return (
    <Center>
      <h1>
        Fill in form to have{" "}
        <span style={{ fontSize: "1.5em" }}>{aiCharacter.card.data.name} </span>
        speak with you
      </h1>
      <FormInputDisplay
        title={"Name"}
        onChange={(value) => {
          setState({ ...state, name: value });
        }}
        autoFocus={true}
      />
      <FormInputDisplay
        title={"Phone"}
        onChange={(value) => {
          setState({ ...state, phone: value });
        }}
      />
      <FormTextAreaDisplay
        showTokenCount={false}
        title={"Description"}
        onChange={(value) => {
          setState({ ...state, description: value });
        }}
        style={{ width: "40em", height: "10em" }}
      />
      <Center>
        <a
          style={{ userSelect: "none" }}
          onClick={async () => {
            const chat = await startNewAgentChat(agentId, {
              extraUserInfo: state,
            });
            console.log({ chat });
            if (!chat) {
              openErrorPopup("oops! something went wrong, how embarrasing!");
              return;
            }
            window.location.href = `/chat-${chat.id}`;
          }}
        >
          Click link to start chat
        </a>
      </Center>
    </Center>
  );
};
