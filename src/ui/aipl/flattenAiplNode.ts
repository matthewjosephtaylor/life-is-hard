import { isDefined } from "@mjtdev/engine";
import type { AiplNode } from "ai-worker-common";

export const flattenAiplNode = (node: AiplNode): AiplNode[] => {
  const result = [node];

  switch (node.type) {
    case "escapedSymbol": {
      return result;
    }
    case "symbol": {
      return result;
    }
    case "program": {
      const children = node.value.flatMap((value) => flattenAiplNode(value));
      result.push(...children);
      return result;
    }
    case "assignment": {
      result.push(...flattenAiplNode(node.transformExpr));
      result.push(...flattenAiplNode(node.question));
      return result;
    }
    case "apply": {
      result.push(...flattenAiplNode(node.identifier));
      result.push(...flattenAiplNode(node.param));
      return result;
    }
    case "transform": {
      return result;
    }
    case "transformExpr": {
      result.push(...flattenAiplNode(node.identifier));
      if (isDefined(node.transform)) {
        result.push(...flattenAiplNode(node.transform));
      }
      return result;
    }
    case "directAssignment": {
      result.push(...flattenAiplNode(node.transformExpr));
      result.push(...flattenAiplNode(node.question));
      return result;
    }
    case "binaryExpr": {
      result.push(...flattenAiplNode(node.left));
      result.push(...flattenAiplNode(node.op));
      result.push(...flattenAiplNode(node.right));
      return result;
    }
    case "code": {
      result.push(...flattenAiplNode(node.condition));
      result.push(...flattenAiplNode(node.body));
      return result;
    }
    case "comment": {
      return result;
    }
    case "multilineComment": {
      return result;
    }
    case "expr": {
      result.push(...flattenAiplNode(node.value));
      return result;
    }
    case "identifier": {
      return result;
    }
    case "number": {
      return result;
    }
    case "boolean": {
      return result;
    }
    case "operator": {
      return result;
    }
    case "stringLiteral": {
      result.push(...flattenAiplNode(node.value));
      return result;
    }
    case "template": {
      for (const child of node.value) {
        if (typeof child !== "string") {
          result.push(...flattenAiplNode(child));
        }
      }
      return result;
    }
    case "templateVariable": {
      result.push(...flattenAiplNode(node.transformExpr));
      return result;
    }
    case "text": {
      return result;
    }
    case "unaryExpr": {
      result.push(...flattenAiplNode(node.operand));
      return result;
    }
    case "urlFunction": {
      result.push(...flattenAiplNode(node.url));
      if (node.args) {
        result.push(...flattenAiplNode(node.args));
      }
      return result;
    }
    case "entry": {
      result.push(...flattenAiplNode(node.value));
      return result;
    }
    case "list": {
      for (const value of node.values) {
        result.push(...flattenAiplNode(value));
      }
      return result;
    }
    case "url": {
      return result;
    }
  }
  throw new Error(`unhandled node : ${JSON.stringify(node)}`);
};
