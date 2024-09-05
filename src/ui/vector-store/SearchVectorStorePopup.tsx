import {
  ButtonGroup,
  Center,
  Grid,
  Reacts,
  isDefined,
  isUndefined,
} from "@mjtdev/engine";
import { useState } from "react";
import { AppBorder } from "../agent/AppBorder";
import { FormTextAreaDisplay } from "../form/FormTextAreaDisplay";
import type { SearchVectorStoreResult } from "ai-worker-common";
import { VectorStoreSearchResult } from "./VectorStoreSearchResult";
import { searchVectorStore } from "./searchVectorStore";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { orError } from "../../common/orError";
import { orErrorSync } from "../../common/orErrorSync";

export const SearchVectorStorePopup = ({
  vectorStoreId,
  onSubmit,
}: {
  vectorStoreId: string;
  onSubmit: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [topK, setTopK] = useState(5);
  const [result, setResult] = useState<SearchVectorStoreResult | undefined>(
    undefined
  );
  const SEARCH_UPDATE_EVT = "vector-store-search-update";
  const search = async () => {
    console.log(`searching: ${query}`);
    const r = await searchVectorStore({ query, vectorStoreId, topK });
    console.log("sr", r);
    setResult(r);
  };
  return (
    <AppBorder title={"search vector store"}>
      <AppBorder collapsable={true} defaultDisclosed={false} title="controls">
        <FormInputDisplay
          onChange={(value) => {
            const num = orErrorSync(() => Number(value));
            if (num instanceof Error || isUndefined(num)) {
              return String(topK);
            }
            setTopK(num);
            return;
          }}
          defaultValue={String(topK)}
          title="num results"
        />
      </AppBorder>
      <Grid direction="column" cellSize={"min-content"}>
        <FormTextAreaDisplay
          autoFocus={true}
          collapsable={false}
          updateEvent={SEARCH_UPDATE_EVT}
          defaultEditable={true}
          placeholder="hit enter for results"
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              evt.preventDefault();
              search();
              Reacts.dispatchCustomEvent(SEARCH_UPDATE_EVT, "");
            }
          }}
          onChange={(value) => setQuery(value)}
          style={{ minWidth: "20em" }}
          title="search"
        />
        <Center>
          <input type="button" onClick={() => search()} value="search" />
        </Center>
      </Grid>
      <Center>
        <VectorStoreSearchResult result={result} />
      </Center>

      <Center style={{ margin: "1em" }}>
        <ButtonGroup
          actions={{
            ok: () => onSubmit(),
            cancel: () => onSubmit(),
          }}
        />
      </Center>
    </AppBorder>
  );
};
