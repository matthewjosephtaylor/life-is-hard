import { Button, Stack } from "@mui/material";
import { LocationDrawerContents, PcDrawerContents } from "./PcDrawerContents";
import { updateLihState } from "./state/LihState";

export const PlayDrawerContents = () => {
  return (
    <Stack>
      <Button
        onClick={() => {
          updateLihState({ mainContent: "locations" });
        }}
      >
        Visit Location
      </Button>
      <PcDrawerContents />
      <LocationDrawerContents />
    </Stack>
  );
};
