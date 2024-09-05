import { fetchWithAuth } from "./fetchWithAuth";
import { getAppState } from "../state/app/AppState";

export const fetchViaProxy = async (url: string) => {
  const { aiBaseUrl } = getAppState();
  return fetchWithAuth(`${aiBaseUrl}/proxy`, undefined, {
    headers: {
      "X-SERVICE": "proxy",
      "X-PROXY": url,
    },
  });
};
