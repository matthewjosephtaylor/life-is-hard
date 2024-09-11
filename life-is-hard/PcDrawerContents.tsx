import { Stack, Typography } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { DataImage } from "./DataImage";
import { useCurrentLocation } from "./useCurrentLocation";
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

export const LocationDrawerContents = () => {
  const location = useCurrentLocation();
  return (
    <Stack gap="0.5em">
      <Typography variant="caption">Current Location</Typography>
      <DataImage style={{ maxWidth: "100%" }} {...location?.image} />
      <Stack
        sx={{
          maxHeight: "15em",
          overflow: "auto",
        }}
      >
        <JsonDisplay data={location?.object} />
      </Stack>
    </Stack>
  );
};
