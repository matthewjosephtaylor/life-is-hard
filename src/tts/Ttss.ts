import {
  getAppState,
  storeAppState,
  updateAppState,
} from "../state/app/AppState";
import { AppMessagesState } from "../state/ws/AppMessagesState";
import { audioPlayer } from "../audio/AudioClipPlayer";

export const disableTts = async () => {
  await audioPlayer.stop();
  updateAppState((state) => {
    state.ttsEnabled = false;
  });
  AppMessagesState.dispatch({
    type: "appInterface:update",
    detail: {
      ttsEnabled: getAppState().ttsEnabled,
    },
  });
  await storeAppState();
};

export const enableTts = async () => {
  const started = await audioPlayer.start();
  if (!started) {
    console.log("unable to enable TTS, unable to start audioPlayer");
    return;
  }
  updateAppState((state) => {
    state.ttsEnabled = true;
  });
  AppMessagesState.dispatch({
    type: "appInterface:update",
    detail: {
      ttsEnabled: getAppState().ttsEnabled,
    },
  });
  await storeAppState();
};

export const toggleTts = async () => {
  if (getAppState().ttsEnabled) {
    return await disableTts();
  }
  return enableTts();
};
export const Ttss = {
  disableTts,
  enableTts,
  toggleTts,
};
