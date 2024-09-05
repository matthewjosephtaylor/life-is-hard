import { stopAsr } from "./stopAsr";

export const stopHearing = (): Promise<void> => {
  return stopAsr();
};
