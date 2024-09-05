import { isUndefined } from "@mjtdev/engine";
import { Flex, type FlexProps } from "@radix-ui/themes";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useRete } from "rete-react-plugin";
import { createReteEditor, type ReteEditor } from "./rete/createReteEditor";

/** @deprecated */
export type AiplNodeEditorRef = {
  update: () => void;
  getReteEditor: () => ReteEditor | undefined | null;
};

/** @deprecated */
export type AiplNodeEditorProps = {
  // characterId: string | undefined;
} & FlexProps;

/** @deprecated */
export const AiplNodeEditorOld = forwardRef<
  AiplNodeEditorRef,
  AiplNodeEditorProps
>(({ ...rest }, ref) => {
  const reteEditorCreator = useMemo(() => createReteEditor(), []);

  const [reteRef, editor] = useRete(reteEditorCreator);
  useImperativeHandle(
    ref,
    () => ({
      update: () => {},
      getReteEditor: () => editor,
    }),
    [editor]
  );

  useEffect(() => {
    const foo = setTimeout(() => {
      editor?.layout();
    }, 1000);
    return () => clearTimeout(foo);
  }, [editor]);

  useEffect(() => {
    if (isUndefined(reteRef.current)) {
      return;
    }
    const observer = new ResizeObserver(() => {
      setTimeout(() => {
        editor?.layout();
      }, 1000);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    observer.observe(reteRef.current!);
    return () => observer.disconnect();
  }, [editor, reteRef]);

  return (
    <>
      <Flex ref={reteRef} {...rest} />
    </>
  );
});
