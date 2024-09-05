import { getAppState } from "../state/app/AppState";
import { fetchWithAuth } from "../fetch/fetchWithAuth";

export const pushTtsCloningSample = (id: string, wavSample: Blob) => {
  const { aiBaseUrl } = getAppState();
  const assetPath = `/asset/cloning/${id}.wav`;
  const fullPath = `${aiBaseUrl}${assetPath}`;
  return fetchWithAuth(fullPath, wavSample, {
    method: "PUT",
    headers: {
      "X-SERVICE": "tts",
    },
  });
};
