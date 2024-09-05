import { ButtonGroup, Grid } from "@mjtdev/engine";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { AppBorder } from "../agent/AppBorder";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { VectorStoreCorporaDisplay } from "./VectorStoreCorporaDisplay";
import { deleteVectorStore } from "./deleteVectorStore";
import { getIngestResult } from "./getIngestResult";
import { ingestVectorStore } from "./ingestVectorStore";
import { openSearchVectorStorePopup } from "./openSearchVectorStorePopup";

export const VectorStoreDisplay = ({
  vectorStoreId,
}: {
  vectorStoreId: string;
}) => {
  const vectorStore = DataIndexesStates.useUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  if (!vectorStore) {
    return <>Missing VectorStore: {vectorStoreId}</>;
  }
  const { id, name } = vectorStore;
  return (
    <AppBorder defaultDisclosed={false} collapsable={true} title={name}>
      <Grid direction="row" gap="0.2em" cellSize={"min-content"}>
        <ButtonGroup
          actions={{
            search: () => openSearchVectorStorePopup(vectorStoreId),
            delete: () => deleteVectorStore(vectorStoreId),
            ingest: () => ingestVectorStore(vectorStoreId),
            ingestWithOcr: () => ingestVectorStore(vectorStoreId, true),
            status: async () => {
              const result = await getIngestResult(vectorStoreId);
              console.log("result", result);
            },
          }}
        />
        <FormInputDisplay
          onChange={(value) => {
            DataIndexesStates.updateUserDataIndexStateRecord(
              "vector-store",
              vectorStoreId,
              (v) => {
                v.name = value;
              }
            );
          }}
          title={"name"}
          defaultValue={name}
        />
        <VectorStoreCorporaDisplay vectorStoreId={vectorStoreId} />
      </Grid>
    </AppBorder>
  );
};
