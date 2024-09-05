import type { AppMessageMap } from "ai-worker-common";
import { Returns } from "../../../state/data-object/Returns";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";

export const directAudioToText = (clip: ArrayBuffer) => {
  return new Promise<string>((resolve, reject) => {
    const returnId = Returns.addReturnListener<AppMessageMap["asr:response"]>({
      onReturn: (data) => {
        resolve(data.text);
      },
    });
    AppMessagesState.dispatch({
      type: "asr:audio2txt",
      detail: {
        audio: clip,
        mediaType: "audio/wav",
        returnId,
      },
    });
  });
};
