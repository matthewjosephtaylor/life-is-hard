import { Grid } from "@radix-ui/themes";
import type { CSSProperties } from "react";
import { memo, useEffect } from "react";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { StaticThoughtItemDisplay } from "./StaticThoughtItemDisplay";

export const StaticThoughtsDisplay = memo(
  ({ parentId, style = {} }: { parentId: string; style?: CSSProperties }) => {
    const thoughts = DataObjectStates.useDataObjectsByType("thought");
    // useEffect(() => {
    //   DataObjectStates.forgetDataObject(thoughts.map((t) => t.id));
    // }, []);

    return (
      <Grid
        columns={{
          initial: "1",
          md: "2",
          // lg: "3",
          // xl: "4",
        }}
        gap="2"
        width="auto"
        maxWidth="120ch"
        style={{
          overflow: "auto",
          textOverflow: "ellipsis",
          ...style,
        }}
      >
        {thoughts.map((thought, i) => (
          <StaticThoughtItemDisplay key={i} thought={thought} />
        ))}
      </Grid>
    );
  }
);
