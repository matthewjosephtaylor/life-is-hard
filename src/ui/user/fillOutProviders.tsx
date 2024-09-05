import type { ServiceProviders } from "ai-worker-common";

export const fillOutProviders = (
  draft: Partial<ServiceProviders>
): ServiceProviders => {
  const {
    imagegen = {
      apiShape: "Cloudflare",
    },
    textgen = { apiShape: "OpenAi" },
    tts = { apiShape: "BrowserTts" },
    proxy = { apiShape: "Cloudflare" },
    crawl = { apiShape: "CustomWc" },
  } = draft;
  return {
    proxy,
    imagegen,
    textgen,
    tts,
    crawl,
  };
};
