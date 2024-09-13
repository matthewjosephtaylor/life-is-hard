import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { AiplClients } from "../../src/client/AiplClients";
import { DataImage } from "../../src/ui/image/DataImage";
import { ifGet } from "../common/ifGet";
import { updateLihState, useLihState } from "../state/LihState";
import { BASIC_ENTITY_METADATA_TYPE_INFO } from "./ENTITY_METADATA_TYPE_INFO";
import { updateGameEntityMetadataIfNotExist } from "./updateGameEntityMetadataIfNotExist";

export const LocationsMainContent = () => {
  const { gamePack } = useLihState();
  const locations = gamePack.entities.filter(
    (entity) => entity.category === "location"
  );

  useEffect(() => {
    const client = AiplClients.createAiplClient();
    console.log("locations", locations);
    try {
      locations.forEach((location) => {
        updateGameEntityMetadataIfNotExist({
          client,
          entity: location,
          metadataTypeInfo: BASIC_ENTITY_METADATA_TYPE_INFO,
        });
      });
    } catch (error) {
      console.error("error", error);
    }
  }, []);
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
                {ifGet(BASIC_ENTITY_METADATA_TYPE_INFO, entity.meta, (l) => {
                  return l.name;
                }) ?? "Unknown"}
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
