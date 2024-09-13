import { Chip, Stack } from "@mui/material";
import { AdventureNpcImage } from "./AdventureNpcImage";

export const NpcsContent = ({ npcNames }: { npcNames?: string[] }) => {
  return (
    <Stack flexWrap={"wrap"} direction={"row"}>
      {/* {npcNames?.map((name) => <Chip key={name} label={name} />)} */}
      {npcNames?.map((name) => <AdventureNpcImage key={name} npcName={name} />)}
    </Stack>
  );
};
