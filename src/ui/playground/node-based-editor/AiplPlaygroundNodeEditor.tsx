import { Animates, Reacts, isUndefined } from "@mjtdev/engine";
import { Flex, Separator } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { getAiplCurrentState } from "../../aipl/useAiplCurrentState";
import { AppButtonGroup } from "../../common/AppButtonGroup";
import type { AiplNodeEditorProps, AiplNodeEditorRef } from "./AiplNodeEditorOld";
import { AiplNodeEditorOld } from "./AiplNodeEditorOld";
import {
  getNodeEditorState,
  updateNodeEditorState,
} from "./getNodeEditorState";
import { updateReteEditor } from "./updateReteEditor";

/** @deprecated */
export const AiplPlaygroundNodeEditor = ({
  characterId,
  ...rest
}: AiplNodeEditorProps & { characterId?: string }) => {
  const aiplNodeEditorRef = useRef<AiplNodeEditorRef>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anim = Animates.create({
      ticksPerSecond: 4,
      ticker: async (tick) => {
        const { aiplContext } = await getAiplCurrentState();

        const reteEditor =
          aiplNodeEditorRef.current?.getReteEditor() ?? undefined;
        if (isUndefined(aiplContext) || isUndefined(reteEditor)) {
          return;
        }
        updateReteEditor({ reteEditor, characterId, aiplContext });
      },
    });
    return () => {
      anim.destroy();
    };
  }, [characterId, aiplNodeEditorRef]);

  Reacts.useEventListener("pointermove", (evt) => {
    // console.log("pointermove", evt);
    const { startX } = getNodeEditorState();
    if (isUndefined(startX)) {
      return;
    }
    const diff = startX - evt.clientX;
    console.log("diff", diff);
    updateNodeEditorState((s) => {
      s.startX = evt.clientX;
    });
    const width = elementRef.current?.clientWidth;
    if (isUndefined(width)) {
      return;
    }
    console.log("width", width);
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
        minWidth: "30vw",
      }}
    >
      <Separator
        onPointerDown={(evt) => {
          console.log("onPointerDown", evt);
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
      <Flex direction={"column"} style={{ width: "100%", height: "100%" }}>
        <AppButtonGroup
          actions={{
            zoom: () => aiplNodeEditorRef.current?.getReteEditor()?.zoom(),
            layout: () => aiplNodeEditorRef.current?.getReteEditor()?.layout(),
          }}
        />
        <AiplNodeEditorOld ref={aiplNodeEditorRef} {...rest} />
      </Flex>
    </Flex>
  );
};
