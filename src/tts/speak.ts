import type { AppVoice } from "ai-worker-common";
import { AppEvents } from "../event/AppEvents";
import { getAppState } from "../state/app/AppState";
import { DataObjectStates } from "../state/data-object/DataObjectStates";
import { speakLinesCustomModel } from "./custom/speakLinesCustomModel";
import { speakLinesBrowser } from "./speakLineBrowser";
import { textToTtsLines } from "./textToTtsLines";

export const speak = async ({
  text,
  voiceId,
}: {
  text: string;
  voiceId?: string;
}) => {
  const { ttsEnabled } = getAppState();
  if (!ttsEnabled) {
    // console.log("speak: refusing to speak: tts disabled");
    return;
  }

  if (!voiceId) {
    console.log("speak: No voice selected for character or for user profile");
    return;
  }

  const voice = await DataObjectStates.getDataObject<AppVoice>(voiceId);
  if (!voice) {
    return AppEvents.dispatchEvent("error", `No voice: ${voiceId}`);
  }
  const apiShape = voice?.apiShape ?? "BrowserTts";

  const lines = textToTtsLines(text);

  switch (apiShape) {
    case "BrowserTts": {
      await speakLinesBrowser(lines, voice?.browserVoiceConfig);
      break;
    }
    case "CustomTts": {
      speakLinesCustomModel(lines, voiceId);
      break;
    }
    default: {
      AppEvents.dispatchEvent(
        "error",
        `No speaker for TTS ApiShape: ${apiShape}`
      );
    }
  }
};
