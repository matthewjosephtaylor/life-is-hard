import { isDefined } from "@mjtdev/engine";
import {
  Aipls,
  type AiplAstSpec,
  type AiplContext,
  type AiplNode,
} from "ai-worker-common";

export const aiplNodeToString = ({
  aiplContext,
  aiplNode,
}: {
  aiplContext?: AiplContext;
  aiplNode: AiplNode;
}) => {
  return isDefined(aiplContext)
    ? Aipls.evaluateNodeToString(aiplContext)(
        aiplNode as AiplAstSpec["stringLiteral"]
      )
    : undefined;
};
