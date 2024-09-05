import type { Monaco } from "@monaco-editor/react";
import type { AiplAstSpec, AiplNode } from "ai-worker-common";
import type { editor } from "monaco-editor";
import { getAppModesAndParams } from "../../state/location/getAppModesAndParams";
import { AppModes } from "../../state/location/AppModes";

export const decorateEditorWithProgram = ({
  program,
  editor,
  nodes,
  monaco,
  decorationsCollection,
}: {
  decorationsCollection: editor.IEditorDecorationsCollection;
  monaco: Monaco;
  nodes: AiplNode[];
  program: AiplAstSpec["program"];
  editor: editor.IStandaloneCodeEditor;
}) => {
  const isDebugMode = getAppModesAndParams().modes.includes("debug");
  const decorations: editor.IModelDeltaDecoration[] = nodes.map((node) => {
    const options: editor.IModelDeltaDecoration["options"] = isDebugMode
      ? {
          hoverMessage: {
            value: `${node.type}`,
          },
          inlineClassName: node.type,
        }
      : {
          inlineClassName: node.type,
        };
    return {
      options,
      range: new monaco.Range(
        node.loc.start.line,
        node.loc.start.column,
        node.loc.end.line,
        node.loc.end.column
      ),
    };
  });
  decorationsCollection.append(decorations);
};
