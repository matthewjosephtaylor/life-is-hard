import { getLihState } from "../state/LihState";

export const createAllEntitiesSystemMessage = () => {
  const { gamePack } = getLihState();
  const { entities } = gamePack;

  return [
    "Existing Entities:",
    "```json",
    "[",
    ...entities.map((entity) => {
      return JSON.stringify({
        entityType: entity.category,
        ...(entity?.object ?? {}),
        ...(entity?.meta ?? {}),
      });
    }),
    "]",
    "```",
  ].join("\n");
};
