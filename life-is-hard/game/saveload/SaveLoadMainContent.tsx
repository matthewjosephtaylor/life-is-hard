import { Divider, FormControl, InputLabel, Stack } from "@mui/material";
import { ButtonGroup } from "../../common/ButtonGroup";
import {
  loadGameIntoBrowserState,
  loadGamePackFromDisk,
  loadGamePackIntoBrowserState,
  storeGameFromStateToBrowser,
  storeGameFromStateToDisk,
  storeGamePackFromStateToBrowser,
  storeGamePackFromStateToDisk,
} from "../../state/SaveLoadGames";
import { LabeledControl } from "../../common/LabeledControl";

export const SaveLoadMainContent = () => {
  return (
    <Stack
      gap="2em"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack
        gap="1em"
        flexWrap={"wrap"}
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LabeledControl label="Browser Save/Load">
          <LabeledControl label="Game Pack">
            <ButtonGroup
              direction={"column"}
              actions={{
                loadGamePack: async () => {
                  loadGamePackIntoBrowserState();
                },
                saveGamePack: async () => {
                  storeGamePackFromStateToBrowser();
                },
              }}
            />
          </LabeledControl>
          <LabeledControl label="Game Save">
            <ButtonGroup
              direction={"column"}
              actions={{
                loadGame: async () => {
                  loadGameIntoBrowserState();
                },
                saveGame: () => {
                  storeGameFromStateToBrowser();
                },
              }}
            />
          </LabeledControl>
        </LabeledControl>
        <LabeledControl label="Disk Save/Load">
          <LabeledControl label="Game Pack">
            <ButtonGroup
              direction={"column"}
              actions={{
                loadGamePack: async () => {
                  loadGamePackFromDisk();
                },
                saveGamePack: async () => {
                  storeGamePackFromStateToDisk();
                },
              }}
            />
          </LabeledControl>
          <LabeledControl label="Game Save">
            <ButtonGroup
              direction={"column"}
              actions={{
                loadGame: async () => {
                  loadGameIntoBrowserState();
                },
                saveGame: () => {
                  storeGameFromStateToDisk();
                },
              }}
            />
          </LabeledControl>
        </LabeledControl>
      </Stack>
    </Stack>
  );
};
