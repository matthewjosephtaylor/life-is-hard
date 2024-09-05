import { getAppState } from "./state/app/AppState";

export const getSession = async () => {
  // Fetches.fetchWithAuth({authToken})
  const { aiBaseUrl } = getAppState();
  console.log("before cookie", document.cookie);
  const response = await fetch(`${aiBaseUrl}/session`);
  console.log(response);
  const sessionId = await response.text();
  console.log("sessionId", sessionId);
  console.log("after cookie", document.cookie);
};
