import type { AppUser } from "ai-worker-common";
import { authTokenToAuthHeader } from "../../common/authTokenToAuthHeader";
import { openErrorPopup } from "../../error/openErrorPopup";
import { getAppState } from "../../state/app/AppState";
import { getUserState } from "../../state/user/UserState";

export const fetchBackend = (path: string, init: RequestInit = {}) => {
  const { aiBaseUrl } = getAppState();

  const { authToken } = getUserState();

  if (!authToken) {
    openErrorPopup("Not logged in, unable get user");
    return;
  }

  const headers = authTokenToAuthHeader(authToken);
  return fetch(aiBaseUrl + path, {
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });
};

export const getBackendUser = async (): Promise<AppUser | undefined> => {
  const { aiBaseUrl } = getAppState();

  const { authToken } = getUserState();

  if (!authToken) {
    console.log("getBackendUser: no authToken, refusing");
    return undefined;
  }

  const headers = authTokenToAuthHeader(authToken);

  const resp = await fetch(aiBaseUrl + "/user", {
    method: "GET",
    headers,
  });
  if (!resp.ok) {
    throw new Error(
      `Bad response from backend getting user: ${resp.statusText}`,
      { cause: resp }
    );
  }
  const text = await resp.text();
  return JSON.parse(text);
};
