import { isUndefined, Keys, safe, TextGens } from "@mjtdev/engine";
import { useState, useEffect } from "react";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { usePc } from "./usePc";
import { Button, Stack } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { createAllTypesSystemMessage } from "./entity/createAllTypesSystemMessage";
import { updateLihState } from "./state/LihState";

export const UpdatePcStatsContent = ({
  updatedStats,
}: {
  updatedStats?: unknown;
}) => {
  const [state, setState] = useState({
    updatedStats: undefined as undefined | unknown,
    prevPc: undefined as undefined | ReturnType<typeof usePc>,
  });
  const ctx = useAiplComponentContext();
  const pc = usePc();
  useEffect(() => {
    // if (!newGoals) {
    //   setState((s) => ({ ...s, goals: [] }));
    //   return;
    // }
    // const goals = newGoals.flatMap((goal) =>
    //   valueToCategoryEntity({ value: goal, category: "goal" })
    // );
    // setState((s) => ({ ...s, goals }));
    setState((s) => ({ ...s, updatedStats }));
  }, [Keys.stableStringify([updatedStats, pc]), ctx?.client]);

  return (
    <Stack flexWrap={"wrap"} direction={"row"}>
      {state.updatedStats ? (
        <Stack>
          <Button
            onClick={async () => {
              console.log("ACCEPTING");
              const typeName = pc?.schemaName;
              const ans = await ctx?.client?.ask({
                systemMessage: [createAllTypesSystemMessage()].join("\n"),
                userMessage: [
                  "I need an updated version of the character",
                  "The update is:",
                  JSON.stringify(state.updatedStats),
                  "The current character object is:",
                  JSON.stringify(pc?.object),
                  `For the above give a JSON ${typeName} response object ONLY! update the current ${typeName} following the instruction or just repeat the object if unsure, or output an error or nothing if the user wants something not possible, or there are no changes.`,
                ].join("\n"),
              });
              if (!ans) {
                return;
              }
              console.log("updateded character ans", ans);
              const jsonText = TextGens.extractMarkdownText(ans);
              console.log("jsonText", jsonText);
              const json = safe(() => JSON.parse(jsonText), { quiet: true });
              setState((s) => ({ ...s, prevPc: pc }));
              updateLihState((s) => {
                s.gamePack.entities = s.gamePack.entities.map((e) => {
                  if (e.id === pc?.id) {
                    e.object = json;
                  }
                  return e;
                });
              });
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              updateLihState((s) => {
                s.gamePack.entities = s.gamePack.entities.map((e) => {
                  if (e.id === state.prevPc?.id) {
                    e.object = state.prevPc?.object;
                  }
                  return e;
                });
              });
              setState((s) => ({ ...s, prevPc: undefined }));
            }}
            disabled={isUndefined(state.prevPc)}
          >
            Undo
          </Button>
        </Stack>
      ) : undefined}
      <JsonDisplay data={state.updatedStats} />
    </Stack>
  );
};
