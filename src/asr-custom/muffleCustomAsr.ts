import { updateCustomAsrState } from "./updateCustomAsrState";


export const muffleCustomAsr = () => {
  updateCustomAsrState((s) => {
    s.muffled = true;
  });
};
