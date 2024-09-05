import { TextGens, isDefined } from "@mjtdev/engine";
import { searchVectorStore } from "../../ui/vector-store/searchVectorStore";
import { updateThoughtCloudState } from "../../ui/visual/ThoughtCloudState";
import { expandedMatch } from "./expandedMatch";
import type { Chat } from "ai-worker-common";

export const getRagMessageText = async ({
  chat,
  query,
  vectorStoreIds = [],
}: {
  chat: Chat;
  query: string | Blob;
  vectorStoreIds?: string[];
}) => {
  console.log("getRagMessageText", [query, vectorStoreIds]);
  if (typeof query !== "string") {
    return undefined;
  }
  const vectorStoreId = vectorStoreIds[0];
  if (!vectorStoreId) {
    return undefined;
  }
  const searchResult = await searchVectorStore({
    query,
    vectorStoreId: vectorStoreIds[0],
    topK: 10,
  });
  console.log("sr", searchResult);
  if (!searchResult) {
    return undefined;
  }
  // const rawSearchTexts = searchResult.matches.map((m) => m.text);
  const { aiName } = chat;

  const expandedMatches = await Promise.all(
    searchResult.matches.map((match, i) =>
      expandedMatch({ index: i, vectorStoreId, match })
    )
  );

  console.log("em", expandedMatches);
  const cleanedExpandedMatches = expandedMatches
    .flat()
    .filter((e) => {
      if (!e.text || TextGens.textToTokens(e.text).length > 100) {
        return undefined;
      }
      return e;
    })
    .filter(isDefined);
  console.log("cleanedExpandedMatches", cleanedExpandedMatches);
  // const corpusDocument: CorpusDocument = undefined;

  const MAX_THOUGHTS = 200;

  updateThoughtCloudState((state) => {
    if (state.thoughts.length > MAX_THOUGHTS) {
      return;
    }
    state.thoughts.push(...cleanedExpandedMatches);
    state.minScore = state.thoughts.reduce((acc, cur) => {
      return Math.min(acc, cur.score);
    }, 1);
    state.maxScore = state.thoughts.reduce((acc, cur) => {
      return Math.max(acc, cur.score);
    }, 0);
  });

  return [
    `# What ${aiName} knows about '${query}':`,
    `The following is information gathered for ${aiName} to help answer questions.`,
    "## Facts:",
    ...cleanedExpandedMatches.map((t) => t.text),
  ].join("\n");
};
