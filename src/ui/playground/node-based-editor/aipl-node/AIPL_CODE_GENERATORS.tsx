import { type AiplAstSpec, type AiplNode } from "ai-worker-common";
import { isDefined, isUndefined } from "@mjtdev/engine";
import type { CodeGenerator } from "./CodeGenerator";

export const AIPL_CODE_GENERATORS: Partial<{
  [k in keyof AiplAstSpec]: CodeGenerator<k>;
}> = {
  comment: (node) => {
    console.log("node", node);
    return `(#${node.value})`;
  },
  text: (node) => {
    return node.value;
  },
  program: (node) => {
    const { value = [] } = node;

    return value.map((value) => aiplNodeToCode(value)).join("");
  },
  identifier: (node) => {
    return node.value;
  },
  transform: (node) => {
    const { arg, name } = node;
    const argString = aiplNodeToCode(arg);
    return `${name}(${argString})`;
  },
  stringLiteral: (node) => {
    return `"${aiplNodeToCode(node?.value)}"`;
  },
  template: (node) => {
    const { value } = node;
    if (typeof value === "string") {
      return value;
    }
    return value
      ?.map((v) => {
        if (typeof v === "string") {
          return v;
        }
        return aiplNodeToCode(v);
      })
      .join("");
  },
  templateVariable: (node) => {
    const { defaultValue, transformExpr } = node;

    const defaultValueString = isDefined(defaultValue)
      ? `:${defaultValue}`
      : "";

    return `{${aiplNodeToCode(transformExpr)}}${defaultValueString}`;
  },
  transformExpr: (node) => {
    const { identifier, transform } = node;
    const transformString = isDefined(transform)
      ? `.${aiplNodeToCode(transform)}`
      : "";
    return `${aiplNodeToCode(identifier)}${transformString}`;
    // return `${identifier.value} -> ${transform.value}`;
  },
};

export const aiplNodeToCode = (aiplNode?: AiplNode) => {
  if (isUndefined(aiplNode)) {
    return "";
  }
  const generator = AIPL_CODE_GENERATORS[aiplNode?.type as keyof AiplAstSpec];
  if (isUndefined(generator)) {
    console.log(
      `aiplNodeToCode: no generator for: ${aiplNode?.type}`,
      aiplNode
    );
    return "";
  }

  // @ts-ignore
  const result = generator(aiplNode);
  console.log(`aiplNodeToCode: result: ${aiplNode?.type}`, result);
  return result;
};
