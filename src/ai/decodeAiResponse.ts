import type {
  CloudflareAiResponse,
  OpenAiTextResponse} from "@mjtdev/engine";
import {
  first,
  isCloudflareAiResponse,
  isOpenAiTextResponse,
} from "@mjtdev/engine";

export const decodeAiResponse = async (
  response: OpenAiTextResponse | CloudflareAiResponse | undefined
) => {
  if (!response) {
    return undefined;
  }
  if (isOpenAiTextResponse(response)) {
    const choices = response.choices || [];
    return first(choices.map((c) => c?.text));
  }
  if (isCloudflareAiResponse(response)) {
    return response.response;
  }
};
