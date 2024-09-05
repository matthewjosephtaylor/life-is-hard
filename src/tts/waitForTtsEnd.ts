import {
  waitForSpeechSynthesisEnd,
  waitForTtsUtteranceEnd,
} from "./waitForTtsUtteranceEnd";
import { getActiveProfile } from "../state/user/getActiveProfile";
import { waitForCustomTtsEnd } from "./custom/waitForCustomTtsEnd";

export const waitForTtsEnd = async () => {
  const profile = await getActiveProfile();
  if (!profile) {
    return;
  }
  const apiShape = profile.providers.tts.apiShape;
  switch (apiShape) {
    case "BrowserTts": {
      await waitForTtsUtteranceEnd();
      await waitForSpeechSynthesisEnd();
      break;
    }
    case "CustomTts": {
      await waitForCustomTtsEnd();
      break;
    }
  }
};
