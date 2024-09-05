import { Reacts, isUndefined } from "@mjtdev/engine";
import { Flex, Separator, type FlexProps } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { AiplBlockDisplay } from "./AiplBlockDisplay";
import {
  getNodeEditorState,
  updateNodeEditorState,
} from "./getNodeEditorState";
import { AppContextMenu } from "../../common/AppContextMenu";
import { addAiplNode } from "./addAiplNode";

export const AiplBlockEditor = ({
  characterId,
  style = {},
  ...rest
}: FlexProps & { characterId?: string }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const width = elementRef.current?.clientWidth;
      if (isUndefined(width)) {
        return;
      }
      elementRef.current?.style.setProperty("width", `${width}px`);
    });
    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  Reacts.useEventListener("pointermove", (evt) => {
    const { startX } = getNodeEditorState();
    if (isUndefined(startX)) {
      return;
    }
    const diff = startX - evt.clientX;
    updateNodeEditorState((s) => {
      s.startX = evt.clientX;
    });
    const width = elementRef.current?.clientWidth;
    if (isUndefined(width)) {
      return;
    }
    elementRef.current?.style.setProperty("width", `${width + diff}px`);
  });
  Reacts.useEventListener("pointerup", (evt) => {
    updateNodeEditorState((s) => {
      s.startX = undefined;
    });
    document.body.style.cursor = "auto";
    document.body.style.userSelect = "auto";
  });

  return (
    <Flex
      ref={elementRef}
      style={{
        width: "100%",
        height: "100%",
        userSelect: "none",
        // minWidth: "30vw",
      }}
    >
      <Separator
        onPointerDown={(evt) => {
          document.body.style.cursor = "ew-resize";
          document.body.style.userSelect = "none";
          updateNodeEditorState((s) => {
            s.startX = evt.clientX;
          });
        }}
        style={{
          padding: "0.2em",
          margin: "0.5em",
          cursor: "ew-resize",
        }}
        orientation="vertical"
        size={"4"}
      />
      <Flex style={{ width: "100%", height: "100%" }}>
        <AppContextMenu
          actions={{
            addComment: () => {
              addAiplNode({ type: "comment", value: "TEST" });
            },
            addText: () => {},
          }}
        >
          <AiplBlockDisplay
            style={{
              ...style,
            }}
            {...rest}
          />
        </AppContextMenu>
      </Flex>
    </Flex>
  );
};
