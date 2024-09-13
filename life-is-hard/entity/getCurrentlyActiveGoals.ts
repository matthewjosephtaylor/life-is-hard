import { getGameState, useGameState } from "../state/GameState";
import { getLihState, useLihState } from "../state/LihState";

export const getCurrentlyActiveGoals = () => {
  const { gamePack } = getLihState();
  const { activeGoals } = getGameState();
  const { entities } = gamePack;
  return entities
    .filter((e) => e.category === "goal")
    .filter((e) => activeGoals.includes(e.id));
};

export const useCurrentlyActiveGoals = () => {
  const { gamePack } = useLihState();
  const { activeGoals } = useGameState();
  const { entities } = gamePack;
  return entities
    .filter((e) => e.category === "goal")
    .filter((e) => activeGoals.includes(e.id));
};
