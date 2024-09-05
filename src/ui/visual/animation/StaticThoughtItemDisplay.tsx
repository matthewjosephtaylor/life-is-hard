import { Colors } from "@mjtdev/engine";
import { Card, Text } from "@radix-ui/themes";
import type { Thought } from "ai-worker-common";
import { idToColor } from "../idToColor";
import { memo } from "react";

export const StaticThoughtItemDisplay = memo(
  ({ thought }: { thought: Thought }) => {
    // console.log("ThoughtItemDisplay redrawing");

    const { documents, score, texts, image, match } = thought;
    const originDoc = documents[0];

    const defaultBackgroundColor = Colors.from("yellow")
      .lighten(0.8)
      .toString();
    const highlightBackgroundColor = originDoc
      ? idToColor(originDoc)
      : defaultBackgroundColor;

    const highlighColor = Colors.textColor([highlightBackgroundColor]);

    return (
      <Card>
        {texts.map((t, i) => (
          <Text
            m="1"
            style={{
              color: t === match?.metadata.text ? "black" : undefined,
              backgroundColor:
                t === match?.metadata.text
                  ? highlightBackgroundColor
                  : undefined,
            }}
            key={i}
          >
            {t}
          </Text>
        ))}
      </Card>
    );
  }
);
