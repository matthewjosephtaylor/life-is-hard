import { createState } from "@mjtdev/engine";


export const [useGameState, updateGameState, getGameState] = createState({
  currentLocationId: undefined as undefined | string,
  activeGoals: [] as string[],
});
export type GameState = ReturnType<typeof getGameState>;
