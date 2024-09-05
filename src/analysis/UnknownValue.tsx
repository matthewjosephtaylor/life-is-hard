import { Grid, Objects, isDefined } from "@mjtdev/engine";
import { AppBorder } from "../ui/agent/AppBorder";
import type { CSSProperties } from "react";

export const UnknownValue = ({
  style,
  value,
}: {
  style?: CSSProperties;
  value: unknown;
}) => {
  if (Array.isArray(value)) {
    <Grid
      style={style}
      direction="column"
      cellSize={"min-content"}
      gap={"1em"}
      count={2}
    >
      {value
        .map((entry, i) => {
          return <UnknownValue key={i} style={style} value={entry} />;
        })
        .flat()}
    </Grid>;
  }

  if (typeof value === "object") {
    return (
      <Grid
        style={style}
        key={crypto.randomUUID()}
        direction="column"
        cellSize={"min-content"}
        gap={"1em"}
        count={2}
      >
        {Objects.entries(value as object)
          .map((entry, i) => {
            const [key, value] = entry;
            return (
              <AppBorder
                // resizable={true}
                collapsable={true}
                key={i}
                title={String(key)}
              >
                {<UnknownValue style={style} value={value} />}
              </AppBorder>
            );
          })
          .flat()}
      </Grid>
    );
  }

  return <span style={style}>{isDefined(value) ? String(value) : ""}</span>;
};
