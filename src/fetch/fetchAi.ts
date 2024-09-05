import type { OpenAiCompletionsRequest } from "@mjtdev/engine";
import { lock, Reacts, safe } from "@mjtdev/engine";
import { AI_LOCK } from "../ai/AI_LOCK";
import { getAppState } from "../state/app/AppState";
import { fetchWithJson } from "./fetchWithJson";
import { getAiPathPrefix } from "../common/getAiPathPrefix";

export const fetchAi = async <R>(
  path: string,
  data: Partial<OpenAiCompletionsRequest>
) => {
  const { aiBaseUrl } = getAppState();
  const pathPrefix = getAiPathPrefix();
  const fullPath = `${aiBaseUrl}${pathPrefix}${path}`;
  const result = await lock(() => fetchWithJson(fullPath, data), {
    name: AI_LOCK,
  });
  const text = await result.text();
  if (result.ok) {
    return safe(() => JSON.parse(text), { onError: text }) as R;
  }

  Reacts.dispatchCustomEvent(
    "error",
    `Error fetching AI: ${result.statusText}: ${result.statusText}: ${text}`
  );
  return undefined;
};
