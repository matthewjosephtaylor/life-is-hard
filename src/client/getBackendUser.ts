import type { AppUser } from "ai-worker-common";
import type { AiplClientContext } from "./AiplClients";
import { authTokenToAuthHeader } from "./authTokenToAuthHeader";

export const getBackendUser = async (
  ctx: AiplClientContext
): Promise<AppUser | undefined> => {
  const { homebaseUrl, authToken } = ctx.get();

  if (!authToken) {
    console.log("getBackendUser: no authToken, refusing");
    return undefined;
  }

  const headers = authTokenToAuthHeader(authToken);
  const url = homebaseUrl + "/user";

  const resp = await fetch(url, {
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
