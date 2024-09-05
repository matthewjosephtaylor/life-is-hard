import type { AppMessageMap } from "ai-worker-common";
import { AppEvents } from "../../../event/AppEvents";
import { Returns } from "../../../state/data-object/Returns";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";
import { isTtsSpeaking } from "../../../tts/isTtsSpeaking";
import { waitTimeout } from "@mjtdev/engine";

export const directTextToAudio = ({
  text,
  characterId,
}: {
  text: string;
  characterId: string;
}) => {
  return new Promise<ArrayBuffer[]>((resolve, reject) => {
    const clips: ArrayBuffer[] = [];
    let draining = false;
    const disposer = AppEvents.addEventListener("ttsAudioWav", async (evt) => {
      console.log("directTextToAudio", evt.detail);
      clips.push(evt.detail.slice(0));
      await waitTimeout(1000);
      if (draining) {
        return;
      }
      drain();
    });
    const returnId = Returns.addReturnListener<AppMessageMap["return"]>({
      onReturn: async (data) => {
        console.log("got return", data);
      },
    });
    AppMessagesState.dispatch({
      type: "tts:txt2audio",
      detail: {
        characterId,
        text,
        returnId,
      },
    });
    const drain = () => {
      draining = true;
      if (isTtsSpeaking()) {
        return setTimeout(() => {
          drain();
        }, 1000);
      }
      disposer();
      resolve(clips);
    };
  });
};
