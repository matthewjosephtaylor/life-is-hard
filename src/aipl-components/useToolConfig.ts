import { isUndefined } from "@mjtdev/engine";
import type { ToolConfig } from "ai-worker-common";
import { useContext, useEffect, useState } from "react";
import { updateCustomAsrState } from "../asr-custom/updateCustomAsrState";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";

export const useToolConfig = () => {
  const aiplComponentContextState = useContext(AiplComponentContext);
  const [state, setState] = useState({
    toolConfig: undefined as undefined | ToolConfig,
  });
  useEffect(() => {
    if (
      isUndefined(aiplComponentContextState) ||
      isUndefined(aiplComponentContextState.typeInfo)
    ) {
      return;
    }

    const toolConfig = aiplComponentContextStateToToolConfig(
      aiplComponentContextState
    );
    setState({
      toolConfig,
    });
    updateCustomAsrState((s) => {
      s.toolConfig = toolConfig;
    });
  }, [aiplComponentContextState]);
  return state.toolConfig;
};

export const aiplComponentContextStateToToolConfig = (
  aiplComponentContextState: AiplComponentContextState
): ToolConfig => {
  return {
    schema: aiplComponentContextState.typeInfo!.schema,
    current: aiplComponentContextState.componentState,
  };
};
