import { Colors } from "@mjtdev/engine";
import { Card, Flex, Text } from "@radix-ui/themes";
import type { AiplNode, AiplNodeType } from "ai-worker-common";
import { idToColor } from "../../../visual/idToColor";
import { AiplNodeToEditorNodeContent } from "./AiplNodeToEditorNodeContent";
import { AIPL_NODE_TO_EDITOR_NODE_NAME } from "./AIPL_NODE_TO_EDITOR_NODE_NAME";
import { stringToCssColors } from "./stringToCssColors";
import { motion } from "framer-motion";
import { AppTextArea } from "../../../common/AppTextArea";
import { Pulse } from "./Pulse";

export const AiplNodeEntry = <T extends AiplNode>({
  aiplNodeOrString,
  label,
  active = true,
  backgroundColor,
}: {
  label?: AiplNodeType | string;
  aiplNodeOrString?: T | string | undefined;
  active?: boolean;
  backgroundColor?: string;
}) => {
  const title = AIPL_NODE_TO_EDITOR_NODE_NAME[label as AiplNodeType] || label;
  const style = {
    ...stringToCssColors(
      JSON.stringify(aiplNodeOrString ?? ""),

      (cur) => {
        if (active) {
          return (
            backgroundColor ??
            //  cur
            Colors.from(cur).desaturate(0.5).toString()
          );
          // cur;
        }
        return Colors.from(cur).desaturate(0.8).darken(0.8).toString();
      }
    ),

    borderRadius: "1em",
    padding: "0.5em",
  };
  const typeStyle = {
    ...stringToCssColors(
      label ?? "",

      (cur) => {
        if (active) {
          return cur;
        }
        return Colors.from(cur).desaturate(0.5).darken(0.5).toString();
      }
    ),
    borderRadius: "1em",
    padding: "0.5em",
  };

  return (
    <Flex style={typeStyle}>
      <Flex align={"center"} gap="0.5em">
        <Card>
          {title ?? <Text>{title}</Text>}
          <Card
            style={{
              ...style,
            }}
          >
            {typeof aiplNodeOrString === "string" ? (
              <Pulse style={style} pulseStyle={typeStyle}>
                <Text style={{ fontSize: 16, width: "1em" }}>
                  {aiplNodeOrString}
                </Text>
              </Pulse>
            ) : (
              <AiplNodeToEditorNodeContent aiplNode={aiplNodeOrString} />
            )}
          </Card>
        </Card>
      </Flex>
    </Flex>
  );
};
