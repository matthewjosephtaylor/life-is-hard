import { Colors, isDefined, isEmpty, isUndefined } from "@mjtdev/engine";
import { Checkbox, Flex, Strong, Text } from "@radix-ui/themes";
import type { AiplNode } from "ai-worker-common";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { AiplCommentEditor } from "./AiplCommentEditor";
import { AiplNodeEntry } from "./AiplNodeEntry";
import { AiplNodeToString } from "./AiplNodeToString";
import { BinaryExprToNodeContent } from "./BinaryExprToNodeContent";
import { IdentifierToNodeContent } from "./IdentifierToNodeContent";
import { StyledNode } from "./StyledNode";
import { aiplNodeToBoolean } from "./aiplNodeToBoolean";
import { AiplAssignmentEditor } from "./AiplAssignmentEditor";

export const AiplNodeToEditorNodeContent = ({
  aiplNode,
}: {
  aiplNode?: AiplNode;
}) => {
  // const aiplNode = aiplNode.aiplNode;
  const { aiplContext } = useAiplCurrentState();
  if (isUndefined(aiplNode)) {
    return <></>;
  }

  const { type } = aiplNode;
  switch (type) {
    case "program": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {aiplNode.value.map((node, index) => (
            <AiplNodeToEditorNodeContent key={index} aiplNode={node} />
          ))}
        </StyledNode>
      );
    }
    case "apply": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {/* <AiplAssignmentEditor aiplNode={aiplNode} /> */}
          <Flex wrap={"wrap"}>
            {" "}
            <AiplNodeEntry
              label={"param"}
              aiplNodeOrString={aiplNode.param}
            />{" "}
            <AiplNodeEntry
              label={"identifier"}
              aiplNodeOrString={aiplNode.identifier}
            />
          </Flex>
        </StyledNode>
      );
    }
    case "assignment": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {/* <AiplAssignmentEditor aiplNode={aiplNode} /> */}
          <Flex wrap={"wrap"}>
            {" "}
            <AiplNodeEntry
              label={"question"}
              aiplNodeOrString={aiplNode.question}
            />{" "}
            <AiplNodeEntry
              label={"transformExpr"}
              aiplNodeOrString={aiplNode.transformExpr}
            />
          </Flex>
        </StyledNode>
      );
    }
    case "urlFunction": {
      return (
        <StyledNode aiplNode={aiplNode} direction={"column"}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry label={"url"} aiplNodeOrString={aiplNode.url} />
        </StyledNode>
      );
    }
    case "url": {
      return (
        <StyledNode aiplNode={aiplNode} direction={"column"}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry label={"scheme"} aiplNodeOrString={aiplNode.scheme} />
          <AiplNodeEntry label={"host"} aiplNodeOrString={aiplNode.host} />
          <AiplNodeEntry label={"path"} aiplNodeOrString={aiplNode.path} />
          <AiplNodeEntry label={"query"} aiplNodeOrString={aiplNode.query} />
        </StyledNode>
      );
    }
    case "transformExpr": {
      return (
        <StyledNode aiplNode={aiplNode} direction={"column"}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.identifier} />
          {isDefined(aiplNode.transform) ? (
            <AiplNodeEntry aiplNodeOrString={aiplNode.transform} />
          ) : undefined}
        </StyledNode>
      );
    }
    case "identifier": {
      return <IdentifierToNodeContent aiplNode={aiplNode} />;
    }
    case "transform": {
      return (
        <StyledNode aiplNode={aiplNode} direction={"column"}>
          <AiplNodeEntry label={"name"} aiplNodeOrString={aiplNode.name} />
          <AiplNodeEntry label={"arg"} aiplNodeOrString={aiplNode.arg} />
        </StyledNode>
      );
    }
    case "text": {
      if (isUndefined(aiplNode.value) || isEmpty(aiplNode.value)) {
        return "";
      }
      return (
        <StyledNode aiplNode={aiplNode} direction={"column"}>
          <Strong>{aiplNode?.type}</Strong>

          <Text
            style={{
              padding: "0.5em",
              borderRadius: "0.5em",

              fontSize: 16,
              color: "black",
              backgroundColor: Colors.from("white").darken(0.2).toString(),
            }}
          >
            {aiplNode.value}
          </Text>
        </StyledNode>
      );
    }
    case "stringLiteral": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeToString aiplNode={aiplNode} />
        </StyledNode>
      );
    }
    case "number": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value.toString()} />
        </StyledNode>
      );
    }
    case "boolean": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value.toString()} />
        </StyledNode>
      );
    }
    case "comment": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplCommentEditor aiplNode={aiplNode} />
        </StyledNode>
      );
    }
    case "multilineComment": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
    case "entry": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
    case "symbol": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
    case "escapedSymbol": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
    case "list": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {aiplNode.values.map((value, i) => (
            <AiplNodeEntry key={i} aiplNodeOrString={value} />
          ))}
        </StyledNode>
      );
    }
    case "templateVariable": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {isDefined(aiplNode.defaultValue) ? (
            <AiplNodeEntry
              label={"defaultValue"}
              aiplNodeOrString={aiplNode.defaultValue}
            />
          ) : undefined}
          {isDefined(aiplNode.transformExpr) ? (
            <AiplNodeEntry aiplNodeOrString={aiplNode.transformExpr} />
          ) : undefined}
        </StyledNode>
      );
    }
    case "template": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          {aiplNode.value.map((node, i) => (
            <AiplNodeEntry key={i} aiplNodeOrString={node} />
          ))}
        </StyledNode>
      );
    }
    case "code": {
      const active = aiplNodeToBoolean({
        aiplContext,
        aiplNode: aiplNode.condition,
      });
      return (
        <StyledNode active={active} aiplNode={aiplNode}>
          <Flex direction={"column"}>
            <Strong>
              {aiplNode?.type}
              <Checkbox checked={active} />
            </Strong>
            <Flex>
              <AiplNodeEntry
                label={"condition"}
                aiplNodeOrString={aiplNode.condition}
              />

              <AiplNodeEntry label={"body"} aiplNodeOrString={aiplNode.body} />
            </Flex>
          </Flex>
        </StyledNode>
      );
    }
    case "directAssignment": {
      return (
        <StyledNode direction={"column"} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <AiplNodeEntry
            label={"question"}
            aiplNodeOrString={aiplNode.question}
          />
          <AiplNodeEntry
            label={"transformExpr"}
            aiplNodeOrString={aiplNode.transformExpr}
          />
        </StyledNode>
      );
    }
    case "expr": {
      const active = aiplNodeToBoolean({
        aiplContext,
        aiplNode: aiplNode.value,
      });
      return (
        <StyledNode active={active} aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <Checkbox checked={active} />
          <AiplNodeEntry aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
    case "unaryExpr": {
      const active = aiplNodeToBoolean({
        aiplContext,
        aiplNode: aiplNode,
      });
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <Checkbox checked={active} />
          <AiplNodeEntry label={"op"} aiplNodeOrString={aiplNode.op} />
          <AiplNodeEntry
            label={"operand"}
            aiplNodeOrString={aiplNode.operand}
          />
        </StyledNode>
      );
    }
    case "binaryExpr": {
      const active = aiplNodeToBoolean({
        aiplContext,
        aiplNode: aiplNode,
      });
      return (
        <StyledNode aiplNode={aiplNode}>
          <Strong>{aiplNode?.type}</Strong>
          <Checkbox checked={active} />
          <BinaryExprToNodeContent aiplNode={aiplNode} />
        </StyledNode>
      );
    }
    case "operator": {
      return (
        <StyledNode aiplNode={aiplNode}>
          <AiplNodeEntry label={"operator"} aiplNodeOrString={aiplNode.value} />
        </StyledNode>
      );
    }
  }
  assertNever(type);
};

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}
