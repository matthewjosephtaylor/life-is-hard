import { Colors } from "@mjtdev/engine";
import type { Monaco } from "@monaco-editor/react";
import type { AiplLangageParams } from "ai-worker-common";
import { aiplTokenNameToColor } from "./aiplTokenNameToColor";
// HACK so that we don't register multiple times
const SETUP_GUARD: Record<string, boolean> = {};
export const setupAiplMonacoLanguage = ({
  monaco,
  aiplLanguageParams = {},
  variableCompletionValues = [],
  languageId,
}: {
  languageId: string;
  monaco: Monaco;
  variableCompletionValues?: string[];
  aiplLanguageParams?: AiplLangageParams;
}) => {
  if (SETUP_GUARD[languageId]) {
    return;
  }
  SETUP_GUARD[languageId] = true;

  monaco.languages.register({ id: languageId });

  monaco.editor.defineTheme(languageId, {
    base: "vs-dark",
    inherit: true,
    encodedTokensColors: [],

    rules: [
      {
        token: "string",
        foreground: aiplTokenNameToColor("string"),
      },
      {
        token: "template_var",
        foreground: Colors.from("cyan").hex(),
      },
      {
        token: "variable", // This should match the token type assigned in the tokenizer
        foreground: aiplTokenNameToColor("variable"), // Define or choose an appropriate color
      },
    ],
    colors: {},
  });

  monaco.editor.setTheme(languageId);
  monaco.languages.setLanguageConfiguration(languageId, {
    brackets: [
      ["(", ")"],
      ["{", "}"],
    ],
  });

  monaco.languages.setMonarchTokensProvider(languageId, {
    tokenizer: {
      root: [
        // Add a new rule for variables
        [/[a-zA-Z_][a-zA-Z0-9_.]*/, "variable"],
        [/\{.*?\}/, "template_var"],
        [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
        [/'([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      string_single: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  monaco.languages.registerCompletionItemProvider(
    languageId,

    {
      provideCompletionItems: (model, position) => {
        const wordUntilPosition = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: wordUntilPosition.startColumn,
          endColumn: wordUntilPosition.endColumn,
        };

        // Replace this with your own logic to provide completions
        const { transforms = [] } = aiplLanguageParams;
        const transformCompletions = transforms.map((transform) => ({
          label: transform,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: `${transform}()`,
          documentation: `${transform} Transform`,
        }));
        const variableCompletions = variableCompletionValues.map((value) => ({
          label: value,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: value,
        }));

        return {
          suggestions: [...transformCompletions, ...variableCompletions].map(
            (completion) => ({
              ...completion,
              range,
            })
          ),
        };
      },
      triggerCharacters: ["."], // Specify dot as a trigger character
    }
  );
};
