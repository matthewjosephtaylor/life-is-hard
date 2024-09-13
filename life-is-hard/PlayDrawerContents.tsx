import { Stack } from "@mui/material";
import { ButtonGroup } from "./common/ButtonGroup";
import { PcDrawerContents } from "./PcDrawerContents";
import { LocationDrawerContents } from "./LocationDrawerContents";
import { updateLihState } from "./state/LihState";
import { GoalsDrawerContents } from "./GoalsDrawerContents";
import { startNewAdventureSceneChat } from "./game/adventure/startNewAdventureSceneChat";

export const PlayDrawerContents = () => {
  return (
    <Stack>
      <ButtonGroup
        defaultButtonProps={{ variant: "outlined" }}
        actions={{
          visitLocation: () => {
            updateLihState({ mainContent: "locations" });
          },
          goals: () => {
            updateLihState({ mainContent: "goals" });
          },
          npcCharacters: () => {
            updateLihState({ mainContent: "npcCharacters" });
          },
          playableCharacters: () => {
            updateLihState({ mainContent: "pcCharacters" });
          },
          adventure: () => {
            startNewAdventureSceneChat();
            updateLihState({ mainContent: "adventure" });
          },
        }}
      />
      <GoalsDrawerContents />
      <PcDrawerContents />
      <LocationDrawerContents />
    </Stack>
  );
};
