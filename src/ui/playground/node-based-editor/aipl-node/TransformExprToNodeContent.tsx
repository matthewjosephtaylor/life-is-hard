import { isDefined } from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import { Aipls, type AiplAstSpec, type AiplContext } from "ai-worker-common";
import { useEffect, useState } from "react";
import { AiplNodeEntry } from "./AiplNodeEntry";
import { Pulse } from "./Pulse";
import { stringToCssColors } from "./stringToCssColors";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { toStableAiplNodeId } from "../toStableAiplNodeId";

export const TransformExprToNodeContent = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["transformExpr"];
}) => {
  const { aiplContext } = useAiplCurrentState();

  const transformValue = isDefined(aiplContext)
    ? Aipls.evaluateNodeToString(aiplContext)(aiplNode)
    : undefined;
  return (
    <Flex direction={"column"}>
      <AiplNodeEntry
        label="variable"
        aiplNodeOrString={aiplNode.identifier.value}
      />
      <Pulse
        style={stringToCssColors(transformValue ?? "")}
        pulseStyle={stringToCssColors(aiplNode.loc.start.offset.toString())}
        pulseKey={toStableAiplNodeId(aiplNode)}
      >
        <AiplNodeEntry label="value" aiplNodeOrString={transformValue} />
      </Pulse>
    </Flex>
  );
};
