import { Keys } from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { AcceptGoalButton } from "./AcceptGoalButton";
import type { GameEntity } from "../../state/GameEntity";
import { valueToCategoryEntity } from "../../valueToCategoryEntity";

export const GoalAcceptContent = ({ newGoals }: { newGoals?: unknown[] }) => {
  const [state, setState] = useState({
    goals: [] as GameEntity[],
  });
  const ctx = useAiplComponentContext();
  useEffect(() => {
    if (!newGoals) {
      setState((s) => ({ ...s, goals: [] }));
      return;
    }
    const goals = newGoals.flatMap((goal) =>
      valueToCategoryEntity({ value: goal, category: "goal" })
    );
    setState((s) => ({ ...s, goals }));
  }, [Keys.stableStringify(newGoals), ctx?.client]);

  return (
    <Stack flexWrap={"wrap"} direction={"row"}>
      {state.goals?.map((goal) => (
        <AcceptGoalButton key={goal.id} goal={goal} />
      ))}
    </Stack>
  );
};
