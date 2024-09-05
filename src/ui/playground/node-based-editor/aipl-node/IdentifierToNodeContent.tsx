import { isDefined } from "@mjtdev/engine";
import { Flex, Strong } from "@radix-ui/themes";
import { Aipls, type AiplAstSpec, type AiplContext } from "ai-worker-common";
import { useEffect, useState } from "react";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { AppTextArea } from "../../../common/AppTextArea";
import { stringToCssColors } from "./stringToCssColors";
import { motion } from "framer-motion";
import { AiplNodeEntry } from "./AiplNodeEntry";
import { Pulse } from "./Pulse";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { StyledNode } from "./StyledNode";

export const IdentifierToNodeContent = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["identifier"];
}) => {
  const { aiplContext } = useAiplCurrentState();

  const value = isDefined(aiplContext)
    ? Aipls.evaluateNodeToString(aiplContext)(aiplNode)
    : undefined;

  const style = stringToCssColors(aiplNode.loc.start.offset.toString());
  const pulseStyle = stringToCssColors(aiplNode.loc.end.offset.toString());

  return (
    <StyledNode aiplNode={aiplNode} direction={"column"}>
      <Strong>{aiplNode?.type}</Strong>
      <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
      <Pulse
        pulseKey={toStableAiplNodeId(aiplNode)}
        style={style}
        pulseStyle={pulseStyle}
      >
        <AppTextArea style={style} key={value} defaultValue={value} />
      </Pulse>
    </StyledNode>
  );
};
