import {
  Asserts,
  Caches,
  Keys,
  Objects,
  Strings,
  isDefined,
} from "@mjtdev/engine";
import type { Monaco } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import type { AppCharacterFieldName } from "ai-worker-common";
import type { editor } from "monaco-editor";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { stringifyEq } from "../chat/stringifyEq";
import type { AiplEditorRef } from "./AiplEditorRef";
import { applyChatStateToEditor } from "./applyChatStateToEditor";
import { handleModelChange } from "./handleModelChange";
import { setupAiplMonacoLanguage } from "./setupAiplMonacoLanguage";
import { useAiplCurrentState } from "./useAiplCurrentState";
import { AppEvents } from "../../event/AppEvents";

export const AiplEditor = memo(
  forwardRef<
    AiplEditorRef,
    {
      onChange?: (value: string) => void;
      defaultValue?: string;
      characterId?: string;
      fieldName: AppCharacterFieldName;
    }
  >(({ defaultValue, onChange = () => {}, characterId, fieldName }, ref) => {
    const { aiplLanguageParams, chatStateEntries } = useAiplCurrentState();

    const editorRef = useRef<editor.IStandaloneCodeEditor | undefined>(
      undefined
    );
    const monacoRef = useRef<Monaco | undefined>(undefined);
    const secretStores = DataObjectStates.useChildDataObjects(
      characterId,
      "app-secret-store"
    );
    const secretKeys = [...secretStores]
      .sort((a, b) => (a.name ?? "")?.localeCompare(b.name ?? ""))
      .flatMap((ss) =>
        Objects.entries(ss.records ?? {}).map((entry) => entry[0])
      );

    const [decorationsCollection, setDecorationsCollection] = useState<
      editor.IEditorDecorationsCollection | undefined
    >(undefined);

    // const { chat } = useCurrentChat();

    const contextName = [characterId, fieldName].filter(isDefined).join(":");

    const contextualChatStateEntries = chatStateEntries.filter(
      (cse) => cse.contextName === contextName
    );

    {
      decorationsCollection?.clear();
      applyChatStateToEditor({
        chatStateEntries: contextualChatStateEntries,
        editor: editorRef.current,
        monaco: monacoRef.current,
        decorationsCollection,
      });

      handleModelChange({
        editor: editorRef.current,
        monaco: monacoRef.current,
        decorationsCollection,
        aiplLanguageParams,
      });
    }

    useImperativeHandle(
      ref,
      () => {
        return {
          setValue: (value) => {
            if (editorRef.current) {
              editorRef.current.setValue(value);
            }
          },
          getValue: () => {
            if (editorRef.current) {
              return editorRef.current.getValue();
            }
            return undefined;
          },
        };
      },
      [editorRef]
    );

    AppEvents.useEventListener(
      "aiplEditorUpdate",
      (evt) => {
        if (
          evt.detail.characterId === characterId &&
          evt.detail.fieldName === fieldName
        ) {
          if (editorRef.current) {
            const value =
              typeof evt.detail.value === "function"
                ? evt.detail.value(editorRef.current.getValue())
                : evt.detail.value;
            editorRef.current.setValue(value);
            onChange(value);
          }
        }
      },
      [characterId, fieldName, editorRef]
    );

    if ((aiplLanguageParams?.transforms?.length ?? 0) === 0) {
      return <div style={{ width: "100%", height: "100%" }} />;
    }

    const languageId =
      "aipl-" +
      Strings.hashFnv32a({
        str: Keys.stableStringify({
          secretKeys,
          aiplLanguageParams,
        }),
      });

    return (
      <Editor
        key={languageId}
        width="100%"
        theme="vs-dark"
        defaultLanguage={languageId}
        defaultValue={defaultValue}
        options={{
          fontFamily: "Roboto Mono",
          wordWrap: "wordWrapColumn",
          wordWrapColumn: 72,
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
        }}
        onMount={async (editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;

          setupAiplMonacoLanguage({
            languageId,
            monaco,
            aiplLanguageParams,
            variableCompletionValues: secretKeys,
          });
          const decorationsCollection = editor.createDecorationsCollection();
          setDecorationsCollection(decorationsCollection);

          handleModelChange({
            editor,
            monaco,
            decorationsCollection,
            aiplLanguageParams,
          });
          editor.onDidChangeModelContent((evt) => {
            decorationsCollection.clear();
            handleModelChange({
              editor,
              monaco,
              decorationsCollection,
              aiplLanguageParams,
            });
            onChange(editor.getValue());
          });
        }}
      />
    );
  }),
  stringifyEq
);
