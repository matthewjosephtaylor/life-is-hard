import { isDefined, safe } from "@mjtdev/engine";
import type { AiplNode } from "ai-worker-common";
import { aiplNodeToId } from "./aiplNodeToId";

export const softFunctionToType = <T>({
  state,
  node,
  defaultValue,
  contextName,
  converter,
}: {
  contextName: string | undefined;
  node: AiplNode;
  defaultValue: T;
  converter: (value: string) => T;
  state: Record<string, string | undefined>;
}): T => {
  const key = `softFunction-${typeof defaultValue}:${contextName}:${aiplNodeToId(
    node
  )}`;

  const result = state[`aipl.${key}`];
  if (isDefined(result)) {
    return safe(() => converter(result)) ?? defaultValue;
  }
  return defaultValue;
};
