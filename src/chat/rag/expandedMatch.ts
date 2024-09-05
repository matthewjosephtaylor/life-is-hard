import { Maths } from "@mjtdev/engine";
import type { VectorMatch } from "ai-worker-common";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { getIngestResult } from "../../ui/vector-store/getIngestResult";
import { INGEST_RESULT_CACHE } from "./INGEST_RESULT_CACHE";
import type { ThoughtAnimations } from "../../ui/visual/Thought";
import { dataIdToCorpusDocument } from "./dataIdToCorpusDocument";
import { createThought } from "./createThought";

export const expandedMatch = async ({
  vectorStoreId,
  match,
  before = 5,
  after = before,
  index,
}: {
  index: number;
  before?: number;
  after?: number;
  vectorStoreId: string;
  match: VectorMatch;
}): Promise<ThoughtAnimations[]> => {
  const vectorStore = DataIndexesStates.getUserDataIndexStateRecord(
    "vector-store",
    vectorStoreId
  );
  const matchOnlyThought: ThoughtAnimations = createThought({
    text: match.text,
    score: match.score,
  });
  if (!vectorStore) {
    return [matchOnlyThought];
  }
  const { ingestResultId } = vectorStore;
  const ingestResult = await INGEST_RESULT_CACHE.get(ingestResultId, () =>
    getIngestResult(vectorStoreId)
  );
  if (!ingestResult) {
    return [matchOnlyThought];
  }
  const corpusDocuments = dataIdToCorpusDocument({
    dataId: match.dataId,
    vectorStoreId,
  });

  const documents = corpusDocuments.map((cp) => ({
    ...cp,
    text: match.text,
  }));
  const matchOnlyThoughtWithCorpusDocument = createThought({
    ...matchOnlyThought,
    documents,
    match,
  });

  const { dataId, chunk, text } = match;
  const { results } = ingestResult;
  const dataResult = results[dataId];
  if (!dataResult) {
    return [matchOnlyThoughtWithCorpusDocument];
  }
  const { chunks } = dataResult;
  if (chunks.length < 2) {
    return [matchOnlyThoughtWithCorpusDocument];
  }
  const clamp = (x: number) => Maths.clamp(x, 0, chunks.length - 1);
  const slice = chunks.slice(clamp(chunk - before), clamp(chunk + after + 1));

  return slice.map((s, i) =>
    createThought({
      index,
      subIndex: i,
      score: match.score,
      text: s,
      documents,
      ingestResultId,
      match,
    })
  );
};
