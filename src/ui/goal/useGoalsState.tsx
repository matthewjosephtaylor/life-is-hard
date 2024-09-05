import { createState } from "@mjtdev/engine";


export const [useGoalsState, updateGoalsState, getGoalsState] = createState({
  enabled: false,
  goals: [] as string[],
});
