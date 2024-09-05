import { isDefined } from "@mjtdev/engine";
import {
  Aipls,
  type AiplAstSpec,
  type AiplContext,
  type AiplNode,
} from "ai-worker-common";
import { useEffect, useState } from "react";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { AppTextArea } from "../../../common/AppTextArea";

export const AiplNodeToString = ({ aiplNode }: { aiplNode: AiplNode }) => {
  const { aiplContext } = useAiplCurrentState();

  const [state, setState] = useState({
    aiplContext: undefined as AiplContext | undefined,
  });
  useEffect(() => {
    setState({ aiplContext });
  }, [aiplContext]);

  const result = isDefined(state.aiplContext)
    ? // && aiplNode.type === "stringLiteral"
      Aipls.evaluateNodeToString(state.aiplContext)(
        aiplNode as AiplAstSpec["stringLiteral"]
      )
    : undefined;
  return <AppTextArea key={result} defaultValue={result} />;
};
