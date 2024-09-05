import { type AiplAstSpec, type AiplNodeType } from "ai-worker-common";


export type AstUpdater<T extends AiplNodeType> = (props: {
  node: AiplAstSpec[T];
  value: string;
}) => void;
