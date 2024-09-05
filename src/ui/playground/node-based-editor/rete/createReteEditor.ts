import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import {
  ArrangeAppliers,
  Presets as ArrangePresets,
  AutoArrangePlugin,
} from "rete-auto-arrange-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { Presets, ReactPlugin } from "rete-react-plugin";
import { AiplReteNodeRenderer } from "./AiplReteNodeRenderer";
import { type AreaExtra, type Schemes } from "./Schemes";

import { ScopesPlugin, Presets as ScopesPresets } from "rete-scopes-plugin";

export type ReteEditor = {
  layout: (animate?: boolean) => Promise<void>;
  zoom: () => Promise<void>;
  destroy: () => void;
  editor: NodeEditor<Schemes>;
  area: AreaPlugin<Schemes, AreaExtra>;
  connection: ConnectionPlugin<Schemes, AreaExtra>;
  render: ReactPlugin<Schemes, AreaExtra>;
  arrange: AutoArrangePlugin<Schemes>;
};
export const createReteEditor =
  () =>
  // aiplText: string, aiplCurrentState: AiplCurrentState

  async (container: HTMLElement): Promise<ReteEditor> => {
    // const ast = Aipls.tryParseAipl(
    //   aiplText,
    //   aiplCurrentState.aiplLanguageParams
    // );

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const arrange = new AutoArrangePlugin<Schemes>();

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
      accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    render.addPreset(
      Presets.classic.setup({
        customize: {
          node(context) {
            if (context.payload.label === "AiplNode") {
              return AiplReteNodeRenderer;
            }
            return Presets.classic.Node;
          },
        },
      })
    );

    connection.addPreset(ConnectionPresets.classic.setup());

    const applier = new ArrangeAppliers.TransitionApplier<Schemes, never>({
      duration: 500,
      timingFunction: (t) => t,
      async onTick() {
        await AreaExtensions.zoomAt(area, editor.getNodes());
      },
    });

    arrange.addPreset(ArrangePresets.classic.setup());

    const scopes = new ScopesPlugin<Schemes>();
    scopes.addPreset(ScopesPresets.classic.setup());

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(scopes);
    area.use(arrange);

    // AreaExtensions.simpleNodesOrder(area);

    // end rete boilerplate

    // await aiplNodeToReteNodes({ aiplNode: ast, editor });
    // AreaExtensions.zoomAt(area, editor.getNodes());
    return {
      layout: async (animate = true) => {
        const options = {
          "elk.algorithm": "mrtree",
          // "elk.algorithm": "stress",
          // "elk.direction": "RIGHT",
          // "elk.spacing.nodeNode": 150,
          // "elk.spacing.nodeNodeBetweenLayers": 30,
          // "elk.layered.layering.strategy": "LONGEST_PATH",
          // "elk.layered.crossingMinimization.strategy": "INTERACTIVE",
          // "elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
        };
        if (animate) {
          await arrange.layout({
            applier,
            options,
          });
        } else {
          await arrange.layout({
            options,
          });
        }
        AreaExtensions.zoomAt(area, editor.getNodes());
      },
      zoom: () => {
        return AreaExtensions.zoomAt(area, editor.getNodes());
      },
      destroy: () => area.destroy(),
      editor,
      area,
      connection,
      arrange,
      render,
    };
  };
