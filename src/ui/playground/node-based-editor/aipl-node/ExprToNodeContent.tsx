import type { AiplAstSpec, AiplNode } from "ai-worker-common";
import type { ReteAiplNode } from "../rete/ReteAiplNode";
import { StyledNode } from "./StyledNode";
import { AiplNodeEntry } from "./AiplNodeEntry";

export const ExprToNodeContent = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["expr"];
}) => {
  return (
    <StyledNode aiplNode={aiplNode}>
      <AiplNodeEntry label={"value"} aiplNodeOrString={aiplNode.value} />
    </StyledNode>
  );
};
