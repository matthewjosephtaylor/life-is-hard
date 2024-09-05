import type { FetchOptions } from "./FetchOptions";
import { fetchWithAuth } from "./fetchWithAuth";

export const fetchWithJson = async <T extends object = object>(
  url: string,
  data?: T | string,
  options: FetchOptions = {}
) => {
  const { method = "POST", headers = {} } = options;

  const body: string = typeof data === "string" ? data : JSON.stringify(data);

  return fetchWithAuth(url, body, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // body,
    method,
  });
};
