import type { AiplClientContext } from "./AiplClients";
import { authTokenToAuthHeader } from "./authTokenToAuthHeader";


export const fetchBackend = (
  ctx: AiplClientContext,
  path: string,
  init: RequestInit = {}
) => {
  const { homebaseUrl, authToken } = ctx.get();

  if (!authToken) {
    throw new Error("Not logged in, unable get user");
  }

  const headers = authTokenToAuthHeader(authToken);
  return fetch(homebaseUrl + path, {
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });
};
