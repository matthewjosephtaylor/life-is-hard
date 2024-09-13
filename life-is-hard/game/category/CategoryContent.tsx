import {
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ifGet } from "../../common/ifGet";
import { ObjectImage } from "../../ObjectImage";
import type { GameEntity } from "../../state/GameEntity";
import { BASIC_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";
import { ButtonGroup } from "../../common/ButtonGroup";
import { updateLihState } from "../../state/LihState";

export const CategoryContent = ({ entity }: { entity: GameEntity }) => {
  return (
    <Card
      key={entity.id}
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
            {...entity.image}
          />
          {/* <FormControlLabel
            sx={{ position: "absolute", top: 0, right: 0 }}
            control={
              <Checkbox
                checked={activeGoals.includes(entity.id)}
                onChange={(evt) => {
                  updateLihState({
                    activeGoals: evt.target.checked
                      ? [...activeGoals, entity.id]
                      : activeGoals.filter((id) => id !== entity.id),
                  });
                }}
              />
            }
            label="Active"
          /> */}
          <ButtonGroup
            actions={{
              delete: () => {
                updateLihState((s) => {
                  s.gamePack.entities = s.gamePack.entities.filter(
                    (e) => e.id !== entity.id
                  );
                });
              },
            }}
          />
          <Typography variant={"caption"}>
            {ifGet(
              BASIC_ENTITY_METADATA_TYPE_INFO,
              entity.meta,
              (g) => g.name
            ) ?? "No Name"}
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
                BASIC_ENTITY_METADATA_TYPE_INFO,
                entity.meta,
                (g) => g.description
              ) ?? "No Description"
            }
          />
          {/* <TextField
            label={"Rewards"}
            multiline
            value={
              ifGet(
                GOAL_ENTITY_METADATA_TYPE_INFO,
                entity.meta,
                (g) => g.rewards
              ) ?? "No Rewards"
            }
          /> */}
          {/* <JsonDisplay data={goal.object} /> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
