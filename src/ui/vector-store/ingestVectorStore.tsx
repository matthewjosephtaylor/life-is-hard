import type { IngestRequest } from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { vectorStoreToDataIds } from "./vectorStoreToDataIds";
import { AppEvents } from "../../event/AppEvents";
import { fetchWithJson } from "../../fetch/fetchWithJson";
import { toBackendUrl } from "../../backend/toBackendUrl";
import { waitFor } from "../common/waitFor";
import { closePopup, openCenteredPopup } from "@mjtdev/engine";
import { AppBorder } from "../agent/AppBorder";

export const ingestVectorStore = async (
  vectorStoreId: string,
  enableOcr = false
) => {
  const vectorStore = DataIndexesStates.getUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  if (!vectorStore) {
    return;
  }
  const dataIds = vectorStoreToDataIds(vectorStore);
  const ingestRequest: IngestRequest = {
    dataIds,
    enableOcr,
    resultDataId: vectorStore.ingestResultId,
  };
  console.log(ingestRequest);
  const resp = await fetchWithJson(toBackendUrl("/ingest"), ingestRequest);

  console.log("ingest resp", resp);
  if (!resp.ok) {
    return AppEvents.dispatchEvent("error", resp);
  }
  const text = await waitFor(resp.text(), { message: "ingesting..." });
  console.log(text);
  const name = openCenteredPopup(
    <AppBorder title="ingest finished">
      <input type="button" onClick={() => closePopup(name)} value="ok" />
    </AppBorder>
  );
};
