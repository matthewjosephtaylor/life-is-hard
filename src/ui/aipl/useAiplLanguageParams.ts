import type { AiplLangageParams, AppMessageMap } from "ai-worker-common";
import { useEffect, useState } from "react";
import { Returns } from "../../state/data-object/Returns";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { createState, isDefined } from "@mjtdev/engine";

export const useAiplLanguageParams = () => {
  const [result, setResult] = useState<AiplLangageParams>({});
  useEffect(() => {
    getAiplLanguageParams().then((data) => {
      setResult(data);
    });
    // const returnId = Returns.addReturnListener<
    //   AppMessageMap["aipl:getAvailableTransforms:response"]
    // >({
    //   onReturn: (data) => {
    //     setResult(data);
    //   },
    // });
    // AppMessagesState.dispatch({
    //   type: "aipl:getAvailableTransforms",
    //   detail: { returnId },
    // });
  }, []);

  return result;
};

const [useAiplLanguageState, updateAiplLanguageState, getAiplLanguageState] =
  createState({
    aiplLanguageParams: undefined as AiplLangageParams | undefined,
  });

export const getAiplLanguageParams = async (): Promise<AiplLangageParams> => {
  const { aiplLanguageParams } = getAiplLanguageState();
  if (isDefined(aiplLanguageParams)) {
    return aiplLanguageParams;
  }
  return new Promise<AiplLangageParams>((resolve, reject) => {
    const returnId = Returns.addReturnListener<
      AppMessageMap["aipl:getAvailableTransforms:response"]
    >({
      onReturn: (aiplLanguageParams) => {
        updateAiplLanguageState((s) => {
          s.aiplLanguageParams = aiplLanguageParams;
        });
        resolve(aiplLanguageParams);
      },
    });
    AppMessagesState.dispatch({
      type: "aipl:getAvailableTransforms",
      detail: { returnId },
    });
  });
};
