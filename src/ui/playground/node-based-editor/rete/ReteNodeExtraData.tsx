import type { AiplNode } from "ai-worker-common";

export type ReteNodeExtraData = {
  width?: number;
  height?: number;
  aiplNode?: AiplNode;
};
export const $nodewidth = 200;
export const $socketmargin = 6;
export const $socketsize = 16;
