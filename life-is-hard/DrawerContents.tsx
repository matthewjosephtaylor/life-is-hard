import { Divider, Stack, Typography } from "@mui/material";
import { ButtonGroup } from "./common/ButtonGroup";
import { EntitiesMenu } from "./entity/EntitiesMenu";
import { SchemasMenu } from "./entity/SchemasMenu";
import { loadGamePack } from "./state/GAME_PACK_DB";
import { updateLihState, useLihState } from "./state/LihState";

export const DrawerContents = () => {
  const { gamePack } = useLihState();
  const actions = Object.fromEntries(
    gamePack.schemas.map((schema) => {
      return [
        `Create ${schema.$id}`,
        () => {
          updateLihState((s) => {
            s.selectedContent = `create-${schema.$id}`;
            s.currentSchema = schema;
            s.currentObjectId = `${schema.$id}-${Date.now()}-${crypto.randomUUID()}`;
          });
        },
      ] as const;
    })
  );
  return (
    <Stack>
      <Divider />
      <ButtonGroup
        actions={{
          loadGamePack: async () => {
            const gamePack = await loadGamePack("default");
            updateLihState((s) => {
              s.gamePack = gamePack;
              s.selectedContent = "createType";
            });
          },
          defineTemplate: () => {
            updateLihState((s) => {
              s.selectedContent = "createType";
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
