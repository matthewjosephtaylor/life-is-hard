import { lock } from "@mjtdev/engine";
import { fetchWithJson } from "../fetch/fetchWithJson";
import { getAppState } from "../state/app/AppState";
import { waitFor } from "../ui/common/waitFor";
import { textToTtsText } from "./textToTtsText";
import { updateServiceStatus } from "../ui/status/ServiceStatus";

export const fetchTtsAudio = async ({
  text,
  voiceName,
  signal,
}: {
  text: string;
  voiceName: string;
  signal?: AbortSignal;
}) => {
  const transformedText = textToTtsText(text);
  // console.log("transformedText", [transformedText, text]);
  const data = {
    text: transformedText,
    speaker_wav: voiceName,
    // speed: 1,
    // language: selectedCustomVoiceLanguage,
  };
  updateServiceStatus((s) => {
    s.services.tts = "busy";
  });
  const resp = await waitFor(
    () =>
      lock(
        async () => {
          const tts_service_path = "/gate/tts_to_audio";
          const { aiBaseUrl } = getAppState();
          const fullPath = `${aiBaseUrl}${tts_service_path}`;
          const resp = await fetchWithJson(fullPath, data, {
            signal,
            headers: {
              "X-SERVICE": "tts",
            },
          });
          return resp!;
        },
        {
          cycleMs: 16,
          maxCycles: 1875, // 30 seconds
          name: "FETCH-AUDIO-LOCK",
        }
      ),
    { message: `fetching audio` }
  );
  updateServiceStatus((s) => {
    s.services.tts = "ready";
  });
  return resp;
};
