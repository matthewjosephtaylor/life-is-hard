import { ButtonGroup, Center, Grid, closePopup } from "@mjtdev/engine";
import type { AiAgent } from "ai-worker-common";
import { useState } from "react";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { FormSelectDisplay } from "../form/FormSelectDisplay";
import { AppBorder } from "./AppBorder";
import { useCharacterOptions } from "./useCharacterOptions";
import { useVectorStoreOptions } from "./useVectorStoreOptions";

export const EditAiAgentPopup = ({
  name,
  onSubmit = () => {},
  defaultValue = {},
}: {
  defaultValue?: Partial<AiAgent>;
  onSubmit?: (value: Partial<AiAgent> | undefined) => void;
  name: string;
}) => {
  const [state, setState] = useState<Partial<AiAgent>>(defaultValue);
  const characterOptions = useCharacterOptions();
  const vectorStorOptions = useVectorStoreOptions();
  return (
    <AppBorder title="Agent">
      <Grid direction="row" cellSize={"min-content"}>
        <FormInputDisplay
          style={{ width: "40em" }}
          disabled={true}
          defaultValue={defaultValue.id}
          title="id"
        />
        <FormInputDisplay
          defaultValue={defaultValue.name}
          onChange={(value) => setState({ ...state, name: value })}
          title="name"
        />
        <FormSelectDisplay
          defaultValue={state.vectorStoreIds?.[0]}
          onChange={(value) => {
            setState({ ...state, vectorStoreIds: [value] });
          }}
          title="vector store"
        >
          {vectorStorOptions}
        </FormSelectDisplay>
        <FormSelectDisplay
          defaultValue={state.aiCharacterId}
          onChange={(value) => {
            setState({ ...state, aiCharacterId: value });
          }}
          title="ai character"
        >
          {characterOptions}
        </FormSelectDisplay>
        <FormSelectDisplay
          defaultValue={state.userCharacterId}
          onChange={(value) => {
            setState({ ...state, userCharacterId: value });
          }}
          title="user character"
        >
          {characterOptions}
        </FormSelectDisplay>
        <Center>
          <ButtonGroup
            actions={{
              OK: () => {
                console.log("OK WTF");
                onSubmit(state);
                closePopup(name);
              },
              Cancel: () => {
                onSubmit(undefined);
                closePopup(name);
              },
            }}
          />
        </Center>
      </Grid>
    </AppBorder>
  );
};
