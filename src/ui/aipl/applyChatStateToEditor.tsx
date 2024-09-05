import { Objects, isDefined } from "@mjtdev/engine";
import type { Monaco } from "@monaco-editor/react";
import type { ChatStateEntry} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import type { editor } from "monaco-editor";
import { aiplLocToMonacoRange } from "./aiplLocToMonacoRange";


export const applyChatStateToEditor = ({
  editor, monaco, decorationsCollection, chatStateEntries,
}: {
  chatStateEntries: ChatStateEntry[];
  editor?: editor.IStandaloneCodeEditor;
  monaco?: Monaco;
  decorationsCollection?: editor.IEditorDecorationsCollection;
}) => {
  if (!monaco || !editor || !decorationsCollection) {
    return;
  }
  const model = editor.getModel();
  if (!model) {
    return;
  }
  const decoratedFacts = Chats.chatStateEntriesToDecoratedFacts(chatStateEntries);
  const monacoDecorations: editor.IModelDeltaDecoration[] = Objects.entries(
    decoratedFacts
  )
    .map((fact) => {
      const [key, decoratedValue] = fact;
      if (!decoratedValue) {
        return undefined;
      }

      const { node, value } = decoratedValue;
      if (!node || !value) {
        return undefined;
      }

      const { loc } = node;

      return {
        options: {
          hoverMessage: {
            value,
          },
          inlineClassName: "state-value",
        },
        range: aiplLocToMonacoRange(loc, monaco),
      } satisfies editor.IModelDeltaDecoration;
    })
    .filter(isDefined);

  decorationsCollection.clear();
  decorationsCollection.append(monacoDecorations);
};
