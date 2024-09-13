import { Stack, Typography } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { DataImage } from "./DataImage";
import { usePc } from "./usePc";

export const PcDrawerContents = () => {
  const pc = usePc();
  return (
    <Stack gap="0.5em">
      <DataImage style={{ maxWidth: "100%" }} {...pc?.image} />
      <Stack
        sx={{
          maxHeight: "15em",
          overflow: "auto",
        }}
      >
        <JsonDisplay data={pc?.object} />
      </Stack>
    </Stack>
  );
};


