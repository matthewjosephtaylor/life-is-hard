import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { useLihState } from "../../state/LihState";
import { GOAL_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";
import { updateGameEntityMetadataIfNotExist } from "../updateGameEntityMetadataIfNotExist";
import { GoalContent } from "./GoalContent";

export const GoalsListContent = () => {
  const { gamePack } = useLihState();
  const ctx = useAiplComponentContext();
  useEffect(() => {
    const goals = gamePack.entities.filter(
      (entity) => entity.category === "goal"
    );
    goals.forEach((goal) => {
      if (!ctx?.client) {
        return;
      }
      updateGameEntityMetadataIfNotExist({
        client: ctx.client,
        entity: goal,
        metadataTypeInfo: GOAL_ENTITY_METADATA_TYPE_INFO,
      });
    });
  }, [gamePack, ctx]);
  return (
    <Stack direction={"row"} flexWrap={"wrap"}>
      {gamePack.entities
        .filter((entity) => entity.category === "goal")
        .map((goal) => (
          <GoalContent key={goal.id} goal={goal} />
        ))}
    </Stack>
  );
};
