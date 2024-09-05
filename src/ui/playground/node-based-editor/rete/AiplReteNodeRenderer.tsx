import { Colors, isUndefined } from "@mjtdev/engine";
import { Flex, Strong } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import type { ClassicScheme, RenderEmit } from "rete-react-plugin";
import { Presets } from "rete-react-plugin";
import { NodeStyles } from "./NodeStyles";
import type { Schemes } from "./Schemes";
import { AiplNodeToEditorNodeContent } from "../aipl-node/AiplNodeToEditorNodeContent";
import { sortByIndex } from "./sortByIndex";
import { AIPL_NODE_TO_EDITOR_NODE_NAME } from "../aipl-node/AIPL_NODE_TO_EDITOR_NODE_NAME";
import type { AiplNodeType } from "ai-worker-common";
import { idToColor } from "../../../visual/idToColor";
import { stringToCssColors } from "../aipl-node/stringToCssColors";

const { RefSocket, RefControl } = Presets.classic;

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  styles?: () => unknown;
  emit: RenderEmit<S>;
};

export function AiplReteNodeRenderer(props: Props<Schemes>) {
  const ref = useRef<HTMLDivElement>(null);

  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id, label, width, height, aiplNode, editor } = props.data;

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  useEffect(() => {
    if (!ref.current || isUndefined(ref.current)) {
      return;
    }
    const observer = new ResizeObserver(() => {
      props.data.width = ref.current?.clientWidth || 0;
      props.data.height = ref.current?.clientHeight || 0;
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, props.data]);
  const typeColors = stringToCssColors(aiplNode?.type ?? "", (cur) =>
    Colors.from(cur).desaturate(0.7).toString()
  );

  console.log(`AiplReteNodeRenderer: ${aiplNode.type}`, { aiplNode, data: props.data});

  return (
    <NodeStyles
      ref={ref}
      selected={selected}
      styles={props.styles}
      data-testid="node"
    >
      <Flex
        style={{
          // color: nodeTextColor,
          minWidth: "10ch",
          boxSizing: "border-box",
          border: `0.1em solid white`,
          padding: "0.4em",
          borderRadius: "1em",
          // backgroundColor: "#242424",
          // backgroundColor: nodeBackgroundColor,
          ...typeColors,
          width: "fit-content",
          height: "fit-content",
        }}
        direction={"column"}
        gap="1em"
        // align={"center"}
      >
        <Flex style={{ width: "100%" }}>
          <Flex flexGrow={"1"} />
          <Strong>
            {AIPL_NODE_TO_EDITOR_NODE_NAME[aiplNode?.type as AiplNodeType] ??
              aiplNode?.type}
          </Strong>
          <Flex flexGrow={"1"} />
        </Flex>
        {/* <AiplNodeToEditorNodeContent reteNode={props.data} /> */}
        {/* Outputs */}
        {outputs.map(
          ([key, output]) =>
            output && (
              <div className="output" key={key} data-testid={`output-${key}`}>
                <div className="output-title" data-testid="output-title">
                  {output?.label}
                </div>
                <RefSocket
                  name="output-socket"
                  side="output"
                  emit={props.emit}
                  socketKey={key}
                  nodeId={id}
                  payload={output.socket}
                />
              </div>
            )
        )}
        {/* Controls */}
        {controls.map(([key, control]) => {
          return control ? (
            <RefControl
              key={key}
              name="control"
              emit={props.emit}
              payload={control}
            />
          ) : null;
        })}
        {/* Inputs */}
        {inputs.map(
          ([key, input]) =>
            input && (
              <div className="input" key={key} data-testid={`input-${key}`}>
                <RefSocket
                  name="input-socket"
                  emit={props.emit}
                  side="input"
                  socketKey={key}
                  nodeId={id}
                  payload={input.socket}
                />
                {input && (!input.control || !input.showControl) && (
                  <div className="input-title" data-testid="input-title">
                    {input?.label}
                  </div>
                )}
                {input?.control && input?.showControl && (
                  <span className="input-control">
                    <RefControl
                      key={key}
                      name="input-control"
                      emit={props.emit}
                      payload={input.control}
                    />
                  </span>
                )}
              </div>
            )
        )}
      </Flex>
    </NodeStyles>
  );
}
