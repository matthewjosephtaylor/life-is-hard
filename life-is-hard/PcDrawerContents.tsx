import { Stack, Typography } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { ObjectImage } from "./ObjectImage";
import { usePc } from "./usePc";

export const PcDrawerContents = () => {
  const pc = usePc();
  return (
    <Stack gap="0.5em">
      <ObjectImage
        style={{ maxWidth: "100%" }}
        object={pc?.object}
        schemaName={pc?.schemaName}
        {...pc?.image}
      />
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
