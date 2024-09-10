import { useEffect, useState } from "react";
import type { AiplComponentContextState } from "../../src/aipl-components/AiplComponentContextState";
import { useAiplComponentContext } from "../../src/aipl-components/useAiplComponentContext";

export const useAiplValue = (aiplName: string, defaultValue = undefined) => {
  const context = useAiplComponentContext();
  const [state, setState] = useState<
    AiplComponentContextState["componentState"][string] | undefined
  >(defaultValue);
  if (!context || !context.typeInfo) {
    console.warn(
      "No AiplComponentContext, returning default value. Must be used within AiplComponentContextProvider."
    );
    return defaultValue;
  }

  useEffect(() => {
    if (!context.componentState) {
      return;
    }
    setState(context.componentState[aiplName] || defaultValue);
  }, [context.componentState, aiplName, defaultValue]);

  return state;
};
