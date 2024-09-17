import { isUndefined, Keys } from "@mjtdev/engine";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import JsonDisplay from "../../common/JsonDisplay";
import type { GameEntity } from "../../state/GameEntity";
import { getLihState, updateLihState } from "../../state/LihState";
import { updateWorldWithCommand } from "./updateWorldWithCommand";

export const UpdateWorldContent = ({
  commands: commands,
}: {
  commands?: unknown[];
}) => {
  const [state, setState] = useState({
    commands: undefined as undefined | unknown[],
    prevEntities: undefined as undefined | GameEntity[],
  });
  // const pc = usePc();
  useEffect(() => {
    setState((s) => ({ ...s, commands: commands }));
  }, [Keys.stableStringify([commands])]);

  return (
    <Stack flexWrap={"wrap"} direction={"row"}>
      {state.commands ? (
        <Stack>
          <Button
            onClick={async () => {
              console.log("ACCEPTING");
              if (!state.commands || !Array.isArray(commands)) {
                return;
              }
              setState((s) => ({
                ...s,
                prevEntities: getLihState().gamePack.entities,
              }));
              for (const command of state.commands) {
                updateWorldWithCommand(command);
              }
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              updateLihState((s) => {
                s.gamePack.entities = state.prevEntities ?? s.gamePack.entities;
              });
              setState((s) => ({ ...s, prevEntities: undefined }));
            }}
            disabled={isUndefined(state.prevEntities)}
          >
            Undo
          </Button>
        </Stack>
      ) : undefined}
      <Stack sx={{ height: "30vh", overflow: "auto" }}>
        <JsonDisplay data={state.commands} />
      </Stack>
    </Stack>
  );
};
