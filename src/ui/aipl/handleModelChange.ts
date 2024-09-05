import type { Monaco } from "@monaco-editor/react";
import { Aipls, type AiplLangageParams } from "ai-worker-common";
import type { editor } from "monaco-editor";
import { AppEvents } from "../../event/AppEvents";
import { decorateEditorWithProgram } from "./decorateEditorWithProgram";
import { flattenAiplNode } from "./flattenAiplNode";
import { programErrorToDiagnostics } from "./programErrorToDiagnostics";

export const handleModelChange = ({
  editor,
  monaco,
  decorationsCollection,
  aiplLanguageParams,
}: {
  aiplLanguageParams: AiplLangageParams;
  editor?: editor.IStandaloneCodeEditor;
  monaco?: Monaco;
  decorationsCollection?: editor.IEditorDecorationsCollection;
}) => {
  if (!editor || !monaco || !decorationsCollection) {
    return;
  }
  const model = editor.getModel();
  if (!model) {
    return;
  }
  try {
    const programOrError = Aipls.parseAipl(
      editor.getValue(),
      aiplLanguageParams
    );

    if (!programOrError.status) {
      programOrError.index.line;
      const errorDecoration: editor.IModelDeltaDecoration = {
        options: {
          inlineClassName: "error",
        },

        range: new monaco.Range(
          programOrError.index.line,
          0,
          programOrError.index.line,
          programOrError.index.column
        ),
      };
      decorationsCollection.append([errorDecoration]);

      const markers = programErrorToDiagnostics(programOrError);
      monaco.editor.setModelMarkers(model, "aipl", markers);
      return;
    }
    monaco.editor.setModelMarkers(model, "aipl", []);

    const nodes = flattenAiplNode(programOrError.value);
    decorateEditorWithProgram({
      decorationsCollection,
      program: programOrError.value,
      editor,
      nodes,
      monaco,
    });
  } catch (error) {
    AppEvents.dispatchEvent("error", error);
  }
};
