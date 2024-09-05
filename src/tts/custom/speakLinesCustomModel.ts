import { isNotEmpty } from "@mjtdev/engine";
import { pushLineToAudioClipQueue } from "./pushLineToAudioClipQueue";

export const speakLinesCustomModel = async (
  lines: string[],
  voiceId: string
) => {
  for (const line of lines.filter(isNotEmpty)) {
    pushLineToAudioClipQueue(
      line
        .trim()
        // HACK to stop TTS from speaking partial stop words
        // TODO cleanup TTS text line for the model
        .replace(/\<.*$/, ""),
      voiceId
    );
  }

  return true;
};
