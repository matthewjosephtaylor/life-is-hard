import { Box } from "@radix-ui/themes";
import type { CSSProperties} from "react";
import { useEffect, useRef, useState } from "react";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AnimatedThoughtItemDisplay } from "./AnimatedThoughtItemDisplay";

export const AnimatedThoughtsDisplay = ({
  parentId,
  style,
}: {
  parentId: string;
  style?: CSSProperties;
}) => {
  const thoughtIds = DataObjectStates.useDataObjectIdsByType("thought");
  // const { thoughtIds } = useThoughtIdsState();
  // const thoughtIds = getThoughtIds();
  const [parentWidth, setParentWidth] = useState<number | undefined>(undefined);
  const [parentHeight, setParentHeight] = useState<number | undefined>(
    undefined
  );
  const [parentX, setParentX] = useState<number | undefined>(undefined);
  const [parentY, setParentY] = useState<number | undefined>(undefined);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const bbox = element.getBoundingClientRect();
      setParentX(bbox.left);
      setParentY(bbox.top);
      setParentHeight(bbox.height);
      setParentWidth(bbox.width);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <Box
      flexGrow={"1"}
      ref={ref}
      width="auto"
      style={{
        position: "relative",
        // backgroundColor: "blue",
        textOverflow: "ellipsis",
      }}
    >
      {thoughtIds.map((thoughtId, i) => (
        <AnimatedThoughtItemDisplay
          index={i}
          key={thoughtId}
          thoughtId={thoughtId}
          // thought={thought}
          parentX={parentX}
          parentY={parentY}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
        />
      ))}
    </Box>
  );
};
