import { Grid } from "@mjtdev/engine";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { AppBorder } from "../agent/AppBorder";
import { disassociateCorpusFromVectorStore } from "./disassociateCorpusFromVectorStore";
import { openAssociateCorpusToVectorStorePopup } from "./openAssociateCorpusToVectorStorePopup";
import { useUserCorpora } from "./useUserCorpora";
import { NoWrap } from "../NoWrap";

export const VectorStoreCorporaDisplay = ({
  vectorStoreId,
}: {
  vectorStoreId: string;
}) => {
  const vectorStore = DataIndexesStates.useUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  if (!vectorStore) {
    return <>No vector store: {vectorStoreId}</>;
  }
  const { corpusIds } = vectorStore;
  const corpora = useUserCorpora().filter((c) => corpusIds.includes(c.id));

  return (
    <AppBorder title="associated corpora">
      <input
        onClick={() => openAssociateCorpusToVectorStorePopup(vectorStoreId)}
        type="button"
        value="associate corpus"
      />
      <AppBorder title="associated">
        <Grid direction="row">
          {corpora.map((c, i) => {
            return (
              <Grid
                key={i}
                direction="column"
                cellSize={"min-content"}
                gap="1em"
              >
                <input
                  onClick={() => {
                    disassociateCorpusFromVectorStore({
                      vectorStoreId,
                      corpusId: c.id,
                    });
                  }}
                  type="button"
                  value="disassociate"
                />
                <NoWrap>{c.name}</NoWrap>
              </Grid>
            );
          })}
        </Grid>
      </AppBorder>
    </AppBorder>
  );
};
