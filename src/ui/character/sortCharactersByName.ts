import type { AppCharacter } from "ai-worker-common";

export const sortCharactersByName = (a: AppCharacter, b: AppCharacter) => {
  return (a.card?.data?.name ?? "").localeCompare(b?.card?.data?.name ?? "");
};
