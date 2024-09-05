import { Grid } from "@mjtdev/engine";
import { AppBorder } from "../agent/AppBorder";
import type { SearchVectorStoreResult } from "ai-worker-common";


export const VectorStoreSearchResult = ({
  result,
}: {
  result: SearchVectorStoreResult | undefined;
}) => {
  if (!result) {
    return <></>;
  }

  const content = result.matches.map((m, i) => {
    const { chunk, dataId, score, text } = m;
    return [
      <div
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "5em",
        }}
        key={crypto.randomUUID()}
      >
        {dataId}
      </div>,
      <div key={crypto.randomUUID()}>{chunk}</div>,
      <div key={crypto.randomUUID()}>{score}</div>,
      <div
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "20em",
        }}
        key={crypto.randomUUID()}
      >
        {text}
      </div>,
    ];
  });
  return (
    <AppBorder title={`results ${result.matches.length}`}>
      <Grid
        style={{ overflow: "auto", maxWidth: "90vw", maxHeight: "50vh" }}
        direction="column"
        gap="1em"
        cellSize={"min-content"}
        count={4}
      >
        <h4>dataId</h4>
        <h4>chunk</h4>
        <h4>score</h4>
        <h4>text</h4>
        {content}
      </Grid>
    </AppBorder>
  );
};
