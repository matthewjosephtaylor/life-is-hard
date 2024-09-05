import { isDefined, safe } from "@mjtdev/engine";
import type { AiplNode, AiplStateUpdaters } from "ai-worker-common";
import { aiplNodeToId } from "./aiplNodeToId";

export const askStringToType = <T>({
  state,
  node,
  contextName,
  defaultValue,
  converter,
}: {
  node: AiplNode;
  contextName: string | undefined;
  defaultValue: T;
  converter: (value: string) => T;
  state: Record<string, string | undefined>;
}): T => {
  const key = `string-${typeof defaultValue}:${contextName}:${aiplNodeToId(
    node
  )}`;
  const result = state[`aipl.${key}`];

  if (isDefined(result)) {
    return safe(() => converter(result)) ?? defaultValue;
  }
  return defaultValue;
};
