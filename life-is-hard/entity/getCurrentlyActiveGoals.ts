import { getLihState, useLihState } from "../state/LihState";

export const getCurrentlyActiveGoals = () => {
  const { gamePack, activeGoals } = getLihState();
  const { entities } = gamePack;
  return entities
    .filter((e) => e.category === "goal")
    .filter((e) => activeGoals.includes(e.id));
};

export const useCurrentlyActiveGoals = () => {
  const { gamePack, activeGoals } = useLihState();
  const { entities } = gamePack;
  return entities
    .filter((e) => e.category === "goal")
    .filter((e) => activeGoals.includes(e.id));
};
