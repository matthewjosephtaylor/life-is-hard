import { isDefined } from "@mjtdev/engine";
import { Divider, Stack } from "@mui/material";
import { ButtonGroup } from "./common/ButtonGroup";
import { loadGamePack } from "./state/GAME_PACK_DB";
import { updateLihState, useLihState } from "./state/LihState";
import { EntitiesMenu } from "./entity/EntitiesMenu";
import { SchemasMenu } from "./entity/SchemasMenu";

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
          });
        },
      ] as const;
    })
  );
  console.log("actions", actions);
  return (
    <Stack>
      <ButtonGroup
        actions={{
          loadGamePack: async () => {
            const gamePack = await loadGamePack("default");
            updateLihState((s) => {
              s.gamePack = gamePack;
              s.selectedContent = "createType";
            });
          },
          createType: () => {
            updateLihState((s) => {
              s.selectedContent = "createType";
            });
          },
          ...actions,
        }}
      />
      <SchemasMenu />
      <Divider />

      <EntitiesMenu />
    </Stack>
  );
};
