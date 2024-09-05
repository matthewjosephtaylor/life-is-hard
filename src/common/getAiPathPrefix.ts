import { getActiveProfile } from "../state/user/getActiveProfile";
import type { ApiShape } from "ai-worker-common";


export const getAiPathPrefix = () => {
  const profile = getActiveProfile();
  const provider = profile?.providers.textgen;

  const apiShape: ApiShape = provider?.apiShape || "Cloudflare";
  return apiShape === "Cloudflare" ? "/ai/cf" : "";
};
