import { ClassicPreset } from "rete";
import type { GetSchemes, NodeEditor } from "rete";
import type { ReactArea2D } from "rete-react-plugin";
import type { ReteAiplNode } from "./ReteAiplNode";
import type { AiplNodeEditorProps } from "../AiplNodeEditorOld";
import { Keys, isDefined, isUndefined } from "@mjtdev/engine";

export const toReteConnectorId = ({
  source,
  sourceOutput,
  target,
  targetInput,
}: {
  source: ReteAiplNode;
  sourceOutput: string;
  target: ReteAiplNode;
  targetInput: string;
}) => {
  return Keys.stableStringify({
    sourceId: source.id,
    targetId: target.id,
    sourceOutput,
    targetInput,
  });
};

export class AiplReteEditorConnection extends ClassicPreset.Connection<
  ReteAiplNode,
  ReteAiplNode
> {
  editor: NodeEditor<Schemes>;
  constructor(
    source: ReteAiplNode,
    sourceOutput: string,
    target: ReteAiplNode,
    targetInput: string,
    editor: NodeEditor<Schemes>
  ) {
    super(source, sourceOutput, target, targetInput);
    // this.id = toReteConnectorId({ source, sourceOutput, target, targetInput });
    this.editor = editor;
    // if (
    //   isUndefined(this.editor.getConnections().find((c) => c.id === this.id))
    // ) {
    //   source.addDestroyListener(() => {
    //     // this.editor.removeConnection(this.id);
    //   });
    // }
  }
}

// class Node extends ClassicPreset.Node {
//   width = 180;
//   height = 120;
// }
// type Schemes = GetSchemes<Node, Connection<Node>>;
export type Schemes = GetSchemes<ReteAiplNode, AiplReteEditorConnection>;
// export type Schemes = GetSchemes<
//   ClassicPreset.Node,
//   ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
// >;
export type AreaExtra = ReactArea2D<Schemes>;
