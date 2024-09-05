import { updateCustomAsrState } from "./updateCustomAsrState";


export const unmuffleCustomAsr = () => {
  updateCustomAsrState((s) => {
    s.muffled = false;
  });
};
