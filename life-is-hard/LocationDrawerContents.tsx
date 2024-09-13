import { Stack, Typography } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { DataImage } from "./DataImage";
import { useCurrentLocation } from "./useCurrentLocation";
import { ifGet } from "./common/ifGet";
import { GOAL_ENTITY_METADATA_TYPE_INFO } from "./game/ENTITY_METADATA_TYPE_INFO";

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


