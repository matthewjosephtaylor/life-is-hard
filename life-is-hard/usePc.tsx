import { useLihState } from "./state/LihState";


export const usePc = () => {
  const { gamePack } = useLihState();
  return gamePack.entities.find((e) => e.category === "pc");
};
