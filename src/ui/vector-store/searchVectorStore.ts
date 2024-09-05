import { fetchWithJson } from "../../fetch/fetchWithJson";
import type {
  SearchVectorStoreRequest,
  SearchVectorStoreResult,
} from "ai-worker-common";
import { Fetches } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { getHomeAuth } from "../../state/getHomeAuth";

export const searchVectorStore = async ({
  namespaceId,
  query,
  topK = 3,
}: {
  namespaceId: string;
  topK?: number;
  query: string;
}): Promise<SearchVectorStoreResult | undefined> => {
  const searchRequest: SearchVectorStoreRequest = {
    namespace: namespaceId,
    query,
    topK,
  };

  const { authToken, homeBaseUrl } = getHomeAuth();
  const resp = await Fetches.fetchWithJson({
    url: `${homeBaseUrl}/vector-store/search`,
    authToken,
    data: searchRequest,
  });
  // const resp = await fetchWithJson(
  //   toBackendUrl("/vector-store/search"),
  //   searchRequest
  // );
  if (!resp.ok) {
    AppEvents.dispatchEvent("error", resp);
    return;
  }
  return resp.json();
};
