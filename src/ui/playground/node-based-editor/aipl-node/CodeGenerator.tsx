import { type AiplAstSpec, type AiplNodeType } from "ai-worker-common";

export type CodeGenerator<T extends AiplNodeType> = (
  node: Partial<AiplAstSpec[T]>
) => string | undefined;
