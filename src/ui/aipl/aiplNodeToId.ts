import { Keys } from "@mjtdev/engine";
import type { AiplNode } from "ai-worker-common";

export const aiplNodeToId = (node: AiplNode) => {
  return Keys.stableStringify(node);
};
