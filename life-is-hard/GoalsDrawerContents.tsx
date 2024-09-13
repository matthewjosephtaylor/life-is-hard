import { Chip, Stack, Typography } from "@mui/material";
import { ifGet } from "./common/ifGet";
import { useCurrentlyActiveGoals } from "./entity/getCurrentlyActiveGoals";
import { GOAL_ENTITY_METADATA_TYPE_INFO } from "./game/ENTITY_METADATA_TYPE_INFO";

export const GoalsDrawerContents = () => {
  const goals = useCurrentlyActiveGoals();
  console.log("active goals", goals);
  return (
    <Stack gap="0.5em">
      <Typography variant="caption">Current Goals</Typography>
      {/* <DataImage style={{ maxWidth: "100%" }} {...goals?.image} /> */}
      <Stack
        sx={{
          maxHeight: "15em",
          overflow: "auto",
        }}
      >
        {goals.map((goal) => (
          <Chip
            key={goal.id}
            label={
              ifGet(GOAL_ENTITY_METADATA_TYPE_INFO, goal.meta, (g) => g.name) ??
              "Unamed Goal"
            }
          />
        ))}
        {/* <JsonDisplay data={goals?.object} /> */}
      </Stack>
    </Stack>
  );
};
