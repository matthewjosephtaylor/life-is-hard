import type { AiplContext, AiplNode } from "ai-worker-common";
import { ClassicPreset, type NodeEditor, type NodeId } from "rete";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { AiplReteEditorConnection, type Schemes } from "./Schemes";

/** @deprecated */
export class ReteAiplNode extends ClassicPreset.Node {
  aiplNode: AiplNode;
  width = 0;
  height = 0;
  parent?: NodeId;
  editor: NodeEditor<Schemes>;
  connections: AiplReteEditorConnection[];
  destroyListeners: (() => void)[];
  active: boolean;
  aiplContext: AiplContext;

  // id: NodeId;
  constructor({
    aiplNode,
    editor,
    active,
    aiplContext,
  }: {
    aiplNode: AiplNode;
    editor: NodeEditor<Schemes>;
    active: boolean;
    aiplContext: AiplContext;
  }) {
    super("AiplNode");
    this.id = toStableAiplNodeId(aiplNode);
    this.aiplNode = aiplNode;
    this.editor = editor;
    this.connections = [];
    const socket = new ClassicPreset.Socket("socket");
    this.addInput("port", new ClassicPreset.Input(socket));
    this.addOutput("port", new ClassicPreset.Output(socket));
    this.destroyListeners = [];
    this.active = active;
    this.aiplContext = aiplContext;
  }

  update({
    aiplNode,
    aiplContext,
  }: {
    aiplNode: AiplNode;
    aiplContext: AiplContext;
  }) {
    this.aiplNode = aiplNode;
    this.aiplContext = aiplContext;
  }
  async addConnection(parent: ReteAiplNode) {
    const connection = new AiplReteEditorConnection(
      parent,
      "port",
      this,
      "port",
      this.editor
    );
    await this.editor.addConnection(connection);
    this.connections.push(connection);
    return connection;
  }

  addDestroyListener(listener: () => void) {
    this.destroyListeners.push(listener);
  }

  destroy() {
    this.destroyListeners.forEach((listener) => listener());
    // this.connections.forEach((connection) => {
    //   this.editor.removeConnection(connection.id);
    // });
    this.editor.removeNode(this.id);
  }
}
