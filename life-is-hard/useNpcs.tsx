import { useLihState } from "./state/LihState";


export const useNpcs = () => {
  const { gamePack } = useLihState();
  return gamePack.entities.find((e) => e.category === "npc");
};
