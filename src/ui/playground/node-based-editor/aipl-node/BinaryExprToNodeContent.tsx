import { createState } from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import { type AiplAstSpec } from "ai-worker-common";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { AiplNodeEntry } from "./AiplNodeEntry";
import { aiplNodeToBoolean } from "./aiplNodeToBoolean";

export const [
  usePlaygroundNbeState,
  updatePlaygroundNbeState,
  getPlaygroundNbeState,
] = createState({
  idToActive: {} as Record<string, boolean | undefined>,
});

export const BinaryExprToNodeContent = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["binaryExpr"];
}) => {
  const { aiplContext } = useAiplCurrentState();

  const active = aiplNodeToBoolean({ aiplContext, aiplNode });

  updatePlaygroundNbeState((s) => {
    s.idToActive[toStableAiplNodeId(aiplNode)] = active;
  });

  return (
    <Flex direction={"column"}>
      <AiplNodeEntry
        active={active}
        label={"left"}
        aiplNodeOrString={aiplNode.left}
      />
      <AiplNodeEntry
        active={active}
        label={"op"}
        aiplNodeOrString={aiplNode.op}
      />
      <AiplNodeEntry
        active={active}
        label={"right"}
        aiplNodeOrString={aiplNode.right}
      />
    </Flex>
  );
};
