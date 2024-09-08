import { Button, Stack } from "@mui/material";
import { updateLihState } from "./LihState";

export const DrawerContents = () => {
  return (
    <Stack>
      <Button
        onClick={() => {
          updateLihState((s) => {
            s.selectedContent = "createType";
          });
        }}
      >
        Create Type
      </Button>
      <Button
        onClick={() => {
          updateLihState((s) => {
            s.selectedContent = "createStory";
          });
        }}
      >
        Create Story
      </Button>
    </Stack>
  );
};
