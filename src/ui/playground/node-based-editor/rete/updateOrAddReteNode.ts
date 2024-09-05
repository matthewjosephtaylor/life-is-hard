import { isDefined } from "@mjtdev/engine";
import { type AiplContext, type AiplNode } from "ai-worker-common";
import type { NodeEditor } from "rete";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { ReteAiplNode } from "./ReteAiplNode";
import { type Schemes } from "./Schemes";

export const updateOrAddReteNode = async ({
  editor,
  reteParent,
  aiplNode,
  active = true,
  aiplContext,
}: {
  editor: NodeEditor<Schemes>;
  reteParent?: ReteAiplNode;
  aiplNode: AiplNode;
  active?: boolean;
  aiplContext: AiplContext;
}) => {
  const nodes = editor.getNodes();
  const reteNodeId = toStableAiplNodeId(aiplNode);
  const existing = nodes
    .filter((n) => n instanceof ReteAiplNode)
    .find((reteNode) => reteNode.id === reteNodeId);
  if (isDefined(existing)) {
    existing.update({ aiplNode, aiplContext });
    return existing;
  }
  const reteNode = new ReteAiplNode({ aiplNode, editor, active, aiplContext });
  await editor.addNode(reteNode);
  if (reteParent) {
    await reteNode.addConnection(reteParent);
  }
  return reteNode;
};
