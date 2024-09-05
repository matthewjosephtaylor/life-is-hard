import { isUndefined } from "@mjtdev/engine";
import { Flex, Text } from "@radix-ui/themes";
import { Aipls, type AiplAstSpec } from "ai-worker-common";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { Pulse } from "./Pulse";
import { TransformExprToNodeContent } from "./TransformExprToNodeContent";
import { stringToCssColors } from "./stringToCssColors";

export const AskEditorNode = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["assignment"];
}) => {
  const { aiplContext } = useAiplCurrentState();
  if (isUndefined(aiplContext)) {
    return <>...</>;
  }

  const questionString =
    aiplNode.question.type === "stringLiteral"
      ? Aipls.evaluateNodeToString(aiplContext)(aiplNode.question)
      : undefined;
  const answerString = Aipls.evaluateNodeToString(aiplContext)(
    aiplNode.transformExpr
  );
  console.log("AskEditorNode", { questionString, answerString });

  return (
    <Pulse
      style={stringToCssColors(aiplNode.loc.start.offset.toString())}
      pulseStyle={stringToCssColors(aiplNode.loc.end.offset.toString())}
      pulseKey={toStableAiplNodeId(aiplNode)}
    >
      <Flex direction={"column"} align={"center"} gap="1em">
        <Pulse
          style={stringToCssColors(
            aiplNode.question.loc.start.offset.toString()
          )}
          pulseStyle={stringToCssColors(
            aiplNode.question.loc.end.offset.toString()
          )}
          pulseKey={toStableAiplNodeId(aiplNode.question)}
        >
          <Text>{questionString}</Text>
        </Pulse>
        <TransformExprToNodeContent
          aiplNode={aiplNode.transformExpr}
        />
      </Flex>
    </Pulse>
  );
};
