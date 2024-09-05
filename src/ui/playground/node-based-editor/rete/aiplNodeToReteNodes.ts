import { isDefined, isEmpty } from "@mjtdev/engine";
import { type AiplContext, type AiplNode } from "ai-worker-common";
import type { NodeEditor } from "rete";
import type { ReteAiplNode } from "./ReteAiplNode";
import { type Schemes } from "./Schemes";
import { updateOrAddReteNode } from "./updateOrAddReteNode";
import { Aipls } from "ai-worker-common";

export const aiplNodeToReteNodes = async ({
  aiplNode,
  reteParent,
  editor,
  aiplContext,
}: {
  editor: NodeEditor<Schemes>;
  reteParent?: ReteAiplNode;
  aiplNode: AiplNode;
  aiplContext: AiplContext;
}) => {
  console.log(`aiplNodeToReteNodes: type: ${aiplNode.type}`, {
    aiplNode,
    reteParent,
  });
  switch (aiplNode.type) {
    case "program": {
      const reteNode = await updateOrAddReteNode({
        editor,
        aiplNode,
        reteParent,
        aiplContext,
      });

      const { value } = aiplNode;
      if (isDefined(value)) {
        for (const child of value) {
          await aiplNodeToReteNodes({
            aiplNode: child,
            editor,
            reteParent: reteNode,
            aiplContext,
          });
        }
      }
      return;
    }

    case "text": {
      if (isEmpty(aiplNode.value)) {
        return;
      }
      await updateOrAddReteNode({ editor, aiplNode, reteParent, aiplContext });
      return;
    }
    case "expr": {
      const active = Aipls.evaluateNodeToBoolean(aiplContext)(aiplNode);
      const exprNode = await updateOrAddReteNode({
        editor,
        aiplNode,
        reteParent,
        active,
        aiplContext,
      });
      await updateOrAddReteNode({
        editor,
        aiplNode: aiplNode.value,
        reteParent: exprNode,
        aiplContext,
      });
      return;
    }
    case "binaryExpr": {
      const active = Aipls.evaluateNodeToBoolean(aiplContext)(aiplNode);
      await updateOrAddReteNode({
        editor,
        aiplNode,
        reteParent,
        active,
        aiplContext,
      });
      return;
    }
    case "code": {
      const codeNode = await updateOrAddReteNode({
        editor,
        aiplNode,
        reteParent,
        aiplContext,
      });

      const { body, condition } = aiplNode;
      const conditionNode = await aiplNodeToReteNodes({
        aiplNode: condition,
        editor,
        reteParent: codeNode,
        aiplContext,
      });
      await aiplNodeToReteNodes({
        aiplNode: body,
        editor,
        reteParent: codeNode,
        aiplContext,
      });
      return;
    }

    default: {
      await updateOrAddReteNode({
        editor,
        aiplNode,
        reteParent,
        aiplContext,
      });
    }
  }
};
