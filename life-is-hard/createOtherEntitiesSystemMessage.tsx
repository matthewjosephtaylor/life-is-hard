import { getLihState } from "./state/LihState";

export const createOtherEntitiesSystemMessage = () => {
  const { currentObjectId, gamePack } = getLihState();
  const { entities } = gamePack;

  const otherEntities = entities.filter(
    (entity) => entity.id !== currentObjectId
  );

  if (otherEntities.length === 0) {
    return "";
  }
  return [
    "Existing Entities:",
    ...otherEntities.map((entity) => {
      return JSON.stringify({
        entityType: entity.category,
        ...(entity?.object ?? {}),
      });
    }),
  ].join("\n");
};


