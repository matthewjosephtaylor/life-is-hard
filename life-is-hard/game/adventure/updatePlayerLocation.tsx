import { isDefined, isUndefined } from "@mjtdev/engine";
import { ifGet } from "../../common/ifGet";
import { getLihState, updateLihState } from "../../state/LihState";
import { BASIC_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";

export const updatePlayerLocation = ({
  didExit,
  currentLocation,
}: Partial<{
  didExit?: boolean;
  currentLocation?: string;
}>) => {
  console.log("updatePlayerLocation", { didExit, currentLocation });
  if (isDefined(didExit) && isUndefined(currentLocation)) {
    updateLihState((s) => {
      s.mainContent = "locations";
    });
  }
  if (isDefined(currentLocation)) {
    const locations = getLihState().gamePack.entities.filter(
      (e) => e.category === "location"
    );
    console.log("locations", locations);
    const realLocation = locations.find((location) => {
      const locationName = ifGet(
        BASIC_ENTITY_METADATA_TYPE_INFO,
        location.meta,
        (l) => l.name
      );
      return locationName === currentLocation;
    });
    console.log("realLocation", realLocation);
    if (isDefined(realLocation)) {
      updateLihState((s) => {
        s.currentLocationId = realLocation.id;
      });
    }
  }
};
