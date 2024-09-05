import { isDefined } from "@mjtdev/engine";
import {
  Aipls,
  type AiplAstSpec,
  type AiplContext,
  type AiplNode,
} from "ai-worker-common";

export const aiplNodeToBoolean = ({
  aiplContext,
  aiplNode,
}: {
  aiplContext?: AiplContext;
  aiplNode: AiplNode;
}) => {
  return isDefined(aiplContext)
    ? Aipls.evaluateNodeToBoolean(aiplContext)(aiplNode as AiplAstSpec["expr"])
    : undefined;
};
