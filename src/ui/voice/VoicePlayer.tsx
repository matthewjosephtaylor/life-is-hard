import { useState } from "react";
import { AppBorder } from "../agent/AppBorder";
import { FormTextAreaDisplay } from "../form/FormTextAreaDisplay";
import { speak } from "../../tts/speak";
import { Ttss } from "../../tts/Ttss";
import { pushVoiceSample } from "./pushVoiceSample";

export const VoicePlayer = ({
  voiceId,
  placeholder = "All your base are belong to us",
}: {
  placeholder?: string;
  voiceId: string;
}) => {
  const [text, setText] = useState(placeholder);
  return (
    <AppBorder title={"player"}>
      <FormTextAreaDisplay
        onChange={(value) => setText(value)}
        placeholder={placeholder}
        title={"example text"}
      />
      <input
        style={{ marginLeft: "1em" }}
        onClick={async () => {
          await Ttss.enableTts();

          await pushVoiceSample(voiceId);
          speak({ text, voiceId });
        }}
        type="button"
        value="play"
      />
    </AppBorder>
  );
};
