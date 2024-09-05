import type {
  OpenAiChatCompletionsRequest,
  OpenAiMessageResponse,
} from "@mjtdev/engine";
import { fetchAi } from "../fetch/fetchAi";

export const askRestfulAiChatCompletions = async (
  params: Partial<OpenAiChatCompletionsRequest> = {}
): Promise<OpenAiMessageResponse | undefined> => {
  return fetchAi<OpenAiMessageResponse>("/v1/completions", params);
};
