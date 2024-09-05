import { Bytes } from "@mjtdev/engine";
import type { SdApiTxt2ImgResponse } from "ai-worker-common";

import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { Returns } from "../state/data-object/Returns";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { signalToAbortHandler } from "./signalToAbortHandler";

export const askForGeneratedImages = async (
  request: Partial<SdApiTxt2ImgRequest> = {},
  options: Partial<{ signal: AbortSignal }> = {}
): Promise<Blob[]> => {
  console.log("generating image", request);
  return new Promise((resolve, reject) => {
    const { signal } = options;
    const returnId = Returns.addReturnListener<SdApiTxt2ImgResponse>({
      onReturn: (sdApiResp) => {
        const blobs = sdApiResp.images.map((image) => {
          const imgBase64 = image;
          const ab = Bytes.base64ToArrayBuffer(imgBase64);
          return new Blob([ab], { type: "image/png" });
        });
        resolve(blobs);
      },
      maxWaitMs: 60 * 1000,
    });

    const abortId = signalToAbortHandler(signal);

    AppMessagesState.dispatch({
      type: "image:generate",
      detail: { request, abortId, returnId },
    });
  });
};
