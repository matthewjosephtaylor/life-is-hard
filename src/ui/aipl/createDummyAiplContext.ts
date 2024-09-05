import type { AiplContext } from "ai-worker-common";

export const createDummyAiplContext = (
  state: Record<string, string | undefined>
): AiplContext => {
  return {
    getAvailableFunctions: () => [],
    apply: () => {},
    applyParamToIdentifier: () => {},
    assignQuestionStringToIdentifier: () => {},
    assignUrlFunctionToIdentifier: () => {},
    assignValueStringToIdentifier: () => {},
    error: () => {},
    logger: () => {},
    softFunctionBinaryToNumber: () => 0,
    softFunctionToBoolean: () => false,
    softFunctionToNumber: () => 0,
    stringToBoolean: () => false,
    stringToNumber: () => 0,
    texts: [],
    state,
    addStateUpdater: () => {},
    getAvailableTransforms: () => [],
    transform: ({ value }) => value,
  };
};
