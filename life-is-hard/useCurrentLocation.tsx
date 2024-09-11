import { useLihState } from "./state/LihState";


export const useCurrentLocation = () => {
  const { gamePack, currentLocationId } = useLihState();
  return gamePack.entities.find((e) => e.id === currentLocationId);
};
