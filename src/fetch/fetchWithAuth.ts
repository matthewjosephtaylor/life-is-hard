import { authTokenToAuthHeader } from "../common/authTokenToAuthHeader";
import { orError } from "../common/orError";
import { AppEvents } from "../event/AppEvents";
import { waitFor } from "../ui/common/waitFor";
import { getUserState } from "../state/user/UserState";
import type { FetchOptions } from "./FetchOptions";

export const fetchWithAuth = async <T extends BodyInit = BodyInit>(
  url: string,
  data?: T | string,
  options: FetchOptions = {}
) => {
  const { headers = {}, signal } = options;
  const { authToken } = getUserState();
  const authHeaders = authToken ? authTokenToAuthHeader(authToken) : {};
  const resp = await waitFor(
    () =>
      orError(() =>
        fetch(url, {
          signal,
          ...options,
          headers: {
            ...authHeaders,
            ...headers,
          },
          body: data,
        })
      ),
    {
      message: "fetching...",
    }
  );
  if (options.signal?.aborted) {
    return new Response("Fetch aborted", { status: 499 });
  }
  if (resp instanceof Error) {
    AppEvents.dispatchEvent("error", resp);
    return new Response(`browser fetch failed for: ${url}`, {
      status: 555,
    });
  }
  return resp;
};
