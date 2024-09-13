import { getLihState, useLihState } from "./state/LihState";
import { getGameState, useGameState } from "./state/GameState";

export const useCurrentLocation = () => {
  const { gamePack } = useLihState();
  const { currentLocationId } = useGameState();
  return gamePack.entities.find((e) => e.id === currentLocationId);
};

export const getCurrentLocation = () => {
  const { gamePack } = getLihState();
  const { currentLocationId } = getGameState();
  return gamePack.entities.find((e) => e.id === currentLocationId);
};
