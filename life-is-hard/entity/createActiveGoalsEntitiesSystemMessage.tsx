import { getCurrentlyActiveGoals } from "./getCurrentlyActiveGoals";

export const createActiveGoalsEntitiesSystemMessage = () => {
  return [
    "Currently active Goals:",
    "```json",
    "[",
    ...getCurrentlyActiveGoals().map((entity) => {
      return JSON.stringify({
        entityType: entity.category,
        ...(entity?.object ?? {}),
      });
    }),
    "]",
    "```",
  ].join("\n");
};
