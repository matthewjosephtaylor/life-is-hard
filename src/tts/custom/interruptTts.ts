import { isUndefined } from "@mjtdev/engine";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { getCurrentChat } from "../../ui/chat/getCurrentChat";
import { audioPlayer } from "../../audio/AudioClipPlayer";

export const interruptTts = async (reason = "unknown") => {
  // console.log(`interruptTts: ${reason}`);
  const chat = await getCurrentChat();
  if (isUndefined(chat?.id)) {
    console.warn("ignoring interrupt. NO current chat");
    return;
  }

  AppMessagesState.dispatch({
    type: "abort",
    detail: chat.id,
  });
  audioPlayer.interrupt();
};
