import { Keys } from "@mjtdev/engine";
import { Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { ifGet } from "../../common/ifGet";
import { GOAL_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";
import { updateGameEntityMetadataIfNotExist } from "../updateGameEntityMetadataIfNotExist";
import type { GameEntity } from "../../state/GameEntity";
import { updateLihState } from "../../state/LihState";

export const AcceptGoalButton = ({ goal }: { goal: GameEntity }) => {
  const [state, setState] = useState({
    goal: undefined as undefined | GameEntity,
  });
  const ctx = useAiplComponentContext();
  useEffect(() => {
    if (!goal) {
      return;
    }
    if (!ctx?.client) {
      return;
    }
    updateGameEntityMetadataIfNotExist({
      client: ctx.client,
      entity: goal,
      metadataTypeInfo: GOAL_ENTITY_METADATA_TYPE_INFO,
    }).then((updatedGoal) => {
      console.log("updatedGoal", updatedGoal);
      setState((s) => ({ ...s, goal: updatedGoal }));
    });
  }, [Keys.stableStringify(goal)]);
  return (
    <Tooltip
      title={ifGet(
        GOAL_ENTITY_METADATA_TYPE_INFO,
        state.goal?.meta,
        (g) => g.rewards
      )}
    >
      <Button
        onClick={() => {
          console.log("accept goal", goal);
          updateLihState((s) => {
            s.gamePack.entities = s.gamePack.entities.filter(
              (e) => e.id !== goal.id
            );
            s.gamePack.entities.push(goal);
          });
        }}
      >
        Accept{" "}
        {ifGet(
          GOAL_ENTITY_METADATA_TYPE_INFO,
          state.goal?.meta,
          (g) => g.name
        ) ?? "Unknown goal"}
      </Button>
    </Tooltip>
  );
};
