import { Divider, Stack, Typography } from "@mui/material";
import { ButtonGroup } from "./common/ButtonGroup";
import { EntitiesMenu } from "./entity/EntitiesMenu";
import { SchemasMenu } from "./entity/SchemasMenu";
import { updateLihState, useLihState } from "./state/LihState";

export const DesignDrawerContents = () => {
  const { gamePack } = useLihState();
  const actions = Object.fromEntries(
    gamePack.schemas.map((schema) => {
      return [
        `Create ${schema.$id}`,
        () => {
          updateLihState((s) => {
            s.mainContent = "createObject";
            s.currentSchema = schema;
            s.currentObjectId = `${schema.$id}-${Date.now()}-${crypto.randomUUID()}`;
          });
        },
      ] as const;
    })
  );
  return (
    <Stack>
      <ButtonGroup
        actions={{
          defineTemplate: () => {
            updateLihState((s) => {
              s.mainContent = "createType";
              s.currentSchema = undefined;
              s.currentObjectId = undefined;
            });
          },
        }}
      />
      <Divider />
      <Typography variant="caption">Create Entities</Typography>
      <ButtonGroup
        actions={{
          ...actions,
        }}
      />
      <Divider />
      <Typography variant="caption">Entity Definitions</Typography>
      <SchemasMenu />
      <Divider />
      <Typography variant="caption">Entities By Category</Typography>
      <EntitiesMenu getType={(entity) => entity.category ?? "lore"} />
      <Divider />
      <Typography variant="caption">Entities By Template</Typography>
      <EntitiesMenu />
      <Divider />
    </Stack>
  );
};
