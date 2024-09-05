import type { AiplNodeType } from "ai-worker-common";


export const AIPL_NODE_TO_EDITOR_NODE_NAME: Partial<
  Record<AiplNodeType, string>
> = {
  assignment: "Ask",
};
