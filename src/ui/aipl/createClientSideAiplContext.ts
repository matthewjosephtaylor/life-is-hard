import { isDefined, toBoolean } from "@mjtdev/engine";
import type { AiplContext } from "ai-worker-common";
import { askStringToType } from "./askStringToType";
import { softFunctionToType } from "./softFunctionToType";

export const createClientSideAiplContext = ({
  state,
  characterId,
  fieldName,
}: {
  characterId?: string;
  fieldName: string;
  state: Record<string, string | undefined>;
}): AiplContext => {
  const contextName = [characterId, fieldName].filter(isDefined).join(":");
  return {
    getAvailableFunctions: () => [],
    apply: () => {},
    applyParamToIdentifier: () => {},
    assignQuestionStringToIdentifier: () => {},
    assignUrlFunctionToIdentifier: () => {},
    assignValueStringToIdentifier: () => {},
    error: () => {},
    logger: () => {},
    // error: console.error,
    // logger: console.log,
    softFunctionBinaryToNumber: (props) => {
      const { left, right, node } = props;
      return softFunctionToType({
        converter: (string) => Number(string?.trim()),
        contextName,
        defaultValue: 0,
        node,
        state,
      });
    },
    softFunctionToBoolean: (value, node) => {
      return softFunctionToType({
        converter: (string) => toBoolean(string?.trim()),
        contextName,
        defaultValue: false,
        node,
        state,
      });
    },
    softFunctionToNumber: (value, node) => {
      return softFunctionToType({
        converter: (string) => Number(string?.trim()),
        contextName,
        defaultValue: 0,
        node,
        state,
      });
    },
    stringToBoolean: (value, node) =>
      askStringToType({
        state,
        node,
        contextName,
        converter: (string) => toBoolean(string.trim()),
        defaultValue: false,
      }),

    stringToNumber: (value, node) =>
      askStringToType({
        state,
        node,
        contextName,
        converter: (string) => Number(string?.trim()),
        defaultValue: 0,
      }),

    texts: [],
    state,
    addStateUpdater: () => {},
    getAvailableTransforms: () => [],
    transform: ({ value }) => value,
  };
};
