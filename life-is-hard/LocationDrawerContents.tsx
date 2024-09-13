import { Stack, Typography } from "@mui/material";
import JsonDisplay from "./common/JsonDisplay";
import { ObjectImage } from "./ObjectImage";
import { useCurrentLocation } from "./useCurrentLocation";

export const LocationDrawerContents = () => {
  const location = useCurrentLocation();
  return (
    <Stack gap="0.5em">
      <Typography variant="caption">Current Location</Typography>
      <ObjectImage
        style={{ maxWidth: "100%" }}
        object={location?.object}
        schemaName={location?.schemaName}
        {...location?.image}
      />
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
