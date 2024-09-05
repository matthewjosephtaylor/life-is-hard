import { type AiplAstSpec } from "ai-worker-common";
import type { AstUpdater } from "./AstUpdater";


export const AIPL_AST_UPDATERS: Partial<{
  [k in keyof AiplAstSpec]: AstUpdater<k>;
}> = {
  comment: ({ node, value }) => {
    return (node.value = value);
  },
  text: ({ node, value }) => {
    return (node.value = value);
  },
};
