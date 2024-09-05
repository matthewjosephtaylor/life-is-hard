import type { Monaco } from "@monaco-editor/react";
import type { AiplLoc } from "ai-worker-common";


export const aiplLocToMonacoRange = (loc: AiplLoc, monaco: Monaco) => {
  return new monaco.Range(
    loc.start.line - 1,
    loc.start.column,
    loc.end.line - 1,
    loc.end.column
  );
};
