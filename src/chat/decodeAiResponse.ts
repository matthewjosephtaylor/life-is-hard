import type {
  CloudflareAiChunkResponse,
  OpenAiTextResponse} from "@mjtdev/engine";
import {
  isCloudflareAiResponse,
  isOpenAiTextResponse,
} from "@mjtdev/engine";

export const decodeAiResponse = (
  resp: OpenAiTextResponse | CloudflareAiChunkResponse | undefined
) => {
  if (!resp) {
    return undefined;
  }
  if (isOpenAiTextResponse(resp)) {
    return resp.choices[0].text;
  }
  if (isCloudflareAiResponse(resp)) {
    return resp.response;
  }
  return undefined;
};
