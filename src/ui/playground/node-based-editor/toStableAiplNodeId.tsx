import { type AiplNode } from "ai-worker-common";
import { Keys } from "@mjtdev/engine";

export const toStableAiplNodeId = (aiplNode: AiplNode) => {
  return Keys.stableStringify({
    type: aiplNode.type,
    start: aiplNode.loc.start,
  });
};
