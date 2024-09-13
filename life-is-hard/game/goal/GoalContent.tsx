import {
  Card,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { ifGet } from "../../common/ifGet";
import { ObjectImage } from "../../ObjectImage";
import type { GameEntity } from "../../state/GameEntity";
import { updateLihState, useLihState } from "../../state/LihState";
import { GOAL_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";

export const GoalContent = ({ goal }: { goal: GameEntity }) => {
  const { activeGoals } = useLihState();
  return (
    <Card
      key={goal.id}
      sx={{
        border: "1px solid black",
        margin: "0.5em",
        padding: "0.5em",
      }}
    >
      <CardContent>
        <Stack
          justifyContent={"center"}
          alignItems={"left"}
          sx={{
            position: "relative",
          }}
        >
          <ObjectImage
            style={{
              maxWidth: "5em",
              objectFit: "contain",
            }}
            {...goal.image}
          />
          <FormControlLabel
            sx={{ position: "absolute", top: 0, right: 0 }}
            control={
              <Checkbox
                checked={activeGoals.includes(goal.id)}
                onChange={(evt) => {
                  updateLihState({
                    activeGoals: evt.target.checked
                      ? [...activeGoals, goal.id]
                      : activeGoals.filter((id) => id !== goal.id),
                  });
                }}
              />
            }
            label="Active"
          />
          <Typography variant={"caption"}>
            {ifGet(GOAL_ENTITY_METADATA_TYPE_INFO, goal.meta, (g) => g.name) ??
              "No Name"}
          </Typography>
        </Stack>
        <Stack
          gap={"0.5em"}
          sx={{
            paddingRight: "0.5em",
            overflow: "auto",
            maxWidth: "15em",
          }}
        >
          <Divider />
          <TextField
            label={"Description"}
            multiline
            value={
              ifGet(
                GOAL_ENTITY_METADATA_TYPE_INFO,
                goal.meta,
                (g) => g.description
              ) ?? "No Description"
            }
          />
          <TextField
            label={"Rewards"}
            multiline
            value={
              ifGet(
                GOAL_ENTITY_METADATA_TYPE_INFO,
                goal.meta,
                (g) => g.rewards
              ) ?? "No Rewards"
            }
          />
          {/* <JsonDisplay data={goal.object} /> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
