import { Divider, Stack } from "@mui/material";
import { ButtonGroup } from "./common/ButtonGroup";
import { DropdownList } from "./common/DropdownList";
import { DRAWER_CONTENTS } from "./DRAWER_CONTENTS";
import { getLihState, updateLihState } from "./state/LihState";

export const DrawerContents = () => {
  const { mode } = getLihState();
  const content = DRAWER_CONTENTS[mode];

  return (
    <Stack
      sx={{
        paddingTop: "0.5em",
        paddingRight: "1ch",
        height: "100%",
        overflow: "auto",
      }}
    >
      <DropdownList
        onChange={(mode) =>
          updateLihState((s) => {
            s.mode = mode;
          })
        }
        selectedValue={mode}
        values={["design", "play"]}
        label="Mode"
      />
      <Divider />

      <ButtonGroup
        actions={{
          "Save/Load": () => {
            updateLihState((s) => {
              s.mainContent = "saveload";
            });
          },
        }}
      />
      <Divider />
      {content}
    </Stack>
  );
};
