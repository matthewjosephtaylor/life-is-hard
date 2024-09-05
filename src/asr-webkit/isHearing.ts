import { getAsrState } from "./AsrState";

export const isHearing = () => {
  const { asrActive: active } = getAsrState();
  return active;
};
