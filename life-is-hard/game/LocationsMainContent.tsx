import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { updateLihState, useLihState } from "../state/LihState";
import { DataImage } from "../../src/ui/image/DataImage";
import { nameOfValue } from "../common/nameOfValue";
import JsonDisplay from "../common/JsonDisplay";

export const LocationsMainContent = () => {
  const { gamePack } = useLihState();
  return (
    <Stack direction={"row"} flexWrap={"wrap"}>
      {gamePack.entities
        .filter((entity) => entity.category === "location")
        .map((entity) => (
          <Card
            key={entity.id}
            sx={{
              border: "1px solid black",
              margin: "0.5em",
              padding: "0.5em",
            }}
          >
            <CardContent>
              <Typography variant={"caption"}>
                {nameOfValue(entity.object) ?? "Unknown"}
              </Typography>
              <Stack sx={{ maxWidth: "10em" }}>
                <DataImage {...entity.image} />
              </Stack>
              <Button
                onClick={() => {
                  updateLihState({ currentLocationId: entity.id });
                }}
              >
                Visit
              </Button>
              {/* <JsonDisplay data={entity.object} /> */}
            </CardContent>
          </Card>
        ))}
    </Stack>
  );
};
